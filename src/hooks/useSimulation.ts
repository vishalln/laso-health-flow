import { useState, useCallback } from 'react';
import { WeeklySnapshot, weeklyData as originalData } from '@/data/patientJourney';

export function useSimulation() {
  const [data, setData] = useState<WeeklySnapshot[]>([...originalData]);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const addLog = (msg: string) => setSimulationLog(prev => [...prev, msg]);

  const simulateWeek = useCallback(() => {
    setData(prev => {
      const last = prev[prev.length - 1];
      const adherence = last.dosesTaken / last.dosesScheduled;
      const baseLoss = adherence > 0.8 ? -0.6 : adherence > 0.5 ? -0.3 : -0.1;
      const noise = (Math.random() - 0.4) * 0.4;
      const newWeight = Math.max(last.weight + baseLoss + noise, 70);
      const glucoseDrop = adherence > 0.8 ? Math.random() * 4 + 2 : Math.random() * 2;
      const newWeek: WeeklySnapshot = {
        week: last.week + 1,
        weight: parseFloat(newWeight.toFixed(1)),
        weightChange: parseFloat((newWeight - last.weight).toFixed(1)),
        fastingGlucose: Math.max(Math.round(last.fastingGlucose - glucoseDrop), 90),
        hba1c: null,
        doseMg: last.doseMg,
        dosesTaken: Math.min(Math.round(5 + Math.random() * 2), 7),
        dosesScheduled: 7,
        sideEffects: last.sideEffects.length > 0 && Math.random() > 0.5
          ? [{ symptom: 'nausea' as const, severity: 1 as const }]
          : [],
        appetite: {
          hungerLevel: Math.min(Math.max(Math.round(last.appetite.hungerLevel + (Math.random() - 0.4)), 1), 5),
          cravings: Math.min(Math.max(Math.round(last.appetite.cravings + (Math.random() - 0.4)), 1), 5),
          mealSize: last.appetite.mealSize,
        },
        events: [{ date: new Date().toISOString().split('T')[0], type: 'log', title: `Week ${last.week + 1} simulated`, detail: `Weight: ${newWeight.toFixed(1)} kg` }],
      };
      addLog(`Simulated week ${newWeek.week}: ${newWeek.weight} kg, ${newWeek.dosesTaken}/7 doses`);
      return [...prev, newWeek];
    });
  }, []);

  const simulateMissedDoses = useCallback(() => {
    setData(prev => {
      const updated = [...prev];
      const last = { ...updated[updated.length - 1] };
      last.dosesTaken = Math.max(last.dosesTaken - 3, 0);
      last.events = [...last.events, { date: new Date().toISOString().split('T')[0], type: 'alert', title: 'Missed doses simulated', detail: `Adherence reduced to ${last.dosesTaken}/7` }];
      updated[updated.length - 1] = last;
      addLog(`Simulated missed doses: now ${last.dosesTaken}/7 this week`);
      return updated;
    });
  }, []);

  const simulateSideEffects = useCallback(() => {
    setData(prev => {
      const updated = [...prev];
      const last = { ...updated[updated.length - 1] };
      last.sideEffects = [
        { symptom: 'nausea', severity: 2 },
        { symptom: 'vomiting', severity: 2 },
        { symptom: 'fatigue', severity: 1 },
      ];
      last.events = [...last.events, { date: new Date().toISOString().split('T')[0], type: 'symptom', title: 'Side effects increased', detail: 'Moderate nausea and vomiting' }];
      updated[updated.length - 1] = last;
      addLog('Simulated increased side effects');
      return updated;
    });
  }, []);

  const reset = useCallback(() => {
    setData([...originalData]);
    setSimulationLog([]);
  }, []);

  const logSymptom = useCallback((symptom: 'nausea' | 'vomiting' | 'constipation' | 'fatigue', severity: 1 | 2 | 3) => {
    setData(prev => {
      const updated = [...prev];
      const last = { ...updated[updated.length - 1] };
      const existing = last.sideEffects.filter(e => e.symptom !== symptom);
      last.sideEffects = [...existing, { symptom, severity }];
      updated[updated.length - 1] = last;
      addLog(`Logged ${symptom} (severity ${severity})`);
      return updated;
    });
  }, []);

  const markDose = useCallback((taken: boolean) => {
    setData(prev => {
      const updated = [...prev];
      const last = { ...updated[updated.length - 1] };
      last.dosesTaken = taken ? Math.min(last.dosesTaken + 1, 7) : Math.max(last.dosesTaken - 1, 0);
      updated[updated.length - 1] = last;
      addLog(taken ? 'Dose marked as taken' : 'Dose marked as missed');
      return updated;
    });
  }, []);

  const logAppetite = useCallback((hunger: number, cravings: number, mealSize: number) => {
    setData(prev => {
      const updated = [...prev];
      const last = { ...updated[updated.length - 1] };
      last.appetite = { hungerLevel: hunger, cravings, mealSize };
      updated[updated.length - 1] = last;
      addLog(`Appetite logged: hunger=${hunger}, cravings=${cravings}`);
      return updated;
    });
  }, []);

  return {
    data,
    simulationLog,
    simulateWeek,
    simulateMissedDoses,
    simulateSideEffects,
    reset,
    logSymptom,
    markDose,
    logAppetite,
  };
}
