import { useMemo } from 'react';
import { WeeklySnapshot, weeklyData as defaultData, expectedWeightCurve, patientProfile } from '@/data/patientJourney';

export type Severity = 'green' | 'amber' | 'red';

export interface ClinicalInsight {
  id: string;
  title: string;
  explanation: string;
  severity: Severity;
  category: 'trend' | 'behavioral' | 'treatment';
}

export interface NextAction {
  id: string;
  action: string;
  reason: string;
  priority: 'safety' | 'adherence' | 'optimization';
}

export interface DoseRecommendation {
  status: 'continue' | 'escalate' | 'hold';
  reason: string;
  currentDose: number;
  weeksOnDose: number;
}

export interface PlateauStatus {
  isPlateaued: boolean;
  duration: number; // weeks
  avgWeeklyLoss: number;
}

export function usePatientAnalytics(data: WeeklySnapshot[] = defaultData) {
  const currentWeek = data[data.length - 1];
  const recentWeeks = data.slice(-4);

  const adherenceScore = useMemo(() => {
    const recent = data.slice(-4);
    const taken = recent.reduce((s, w) => s + w.dosesTaken, 0);
    const scheduled = recent.reduce((s, w) => s + w.dosesScheduled, 0);
    return Math.round((taken / scheduled) * 100);
  }, [data]);

  const plateau = useMemo((): PlateauStatus => {
    if (recentWeeks.length < 3) return { isPlateaued: false, duration: 0, avgWeeklyLoss: 0 };
    const last3 = recentWeeks.slice(-3);
    const avgLoss = Math.abs(last3.reduce((s, w) => s + w.weightChange, 0) / 3);
    const isPlateaued = avgLoss < 0.3;
    let duration = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (Math.abs(data[i].weightChange) < 0.3) duration++;
      else break;
    }
    return { isPlateaued, duration, avgWeeklyLoss: avgLoss };
  }, [data, recentWeeks]);

  const insights = useMemo((): ClinicalInsight[] => {
    const result: ClinicalInsight[] = [];
    // Trend: plateau
    if (plateau.isPlateaued) {
      result.push({
        id: 'plateau', title: 'Weight plateau detected',
        explanation: `Weight loss has been less than 0.3 kg/week for ${plateau.duration} consecutive weeks. This is common around weeks 6-8 and may indicate a need for dose review.`,
        severity: 'amber', category: 'trend',
      });
    }
    // Trend: good progress
    const totalLoss = data[0].weight - currentWeek.weight;
    const pctLoss = (totalLoss / data[0].weight) * 100;
    if (pctLoss > 5) {
      result.push({
        id: 'good-progress', title: 'Significant weight reduction achieved',
        explanation: `${totalLoss.toFixed(1)} kg lost (${pctLoss.toFixed(1)}% of starting weight) over ${data.length} weeks. This is within the expected range for GLP-1 therapy.`,
        severity: 'green', category: 'trend',
      });
    }
    // Behavioral: adherence
    if (adherenceScore < 85) {
      result.push({
        id: 'adherence-low', title: 'Medication adherence below optimal',
        explanation: `Adherence score is ${adherenceScore}% over the last 4 weeks. GLP-1 effectiveness depends on consistent daily dosing. Missing doses reduces drug exposure and may slow progress.`,
        severity: adherenceScore < 60 ? 'red' : 'amber', category: 'behavioral',
      });
    }
    // Treatment: response vs expected
    const expectedAtWeek = expectedWeightCurve.find(e => e.week === currentWeek.week);
    if (expectedAtWeek) {
      const diff = currentWeek.weight - expectedAtWeek.expected;
      if (diff > 1.5) {
        result.push({
          id: 'below-expected', title: 'Response below expected for current dose',
          explanation: `Current weight is ${diff.toFixed(1)} kg above the expected trajectory based on STEP trial data. Possible factors: adherence, diet, or individual metabolic variation.`,
          severity: 'amber', category: 'treatment',
        });
      }
    }
    // Appetite returning
    if (recentWeeks.length >= 2) {
      const appetiteIncrease = recentWeeks[recentWeeks.length - 1].appetite.hungerLevel - recentWeeks[0].appetite.hungerLevel;
      if (appetiteIncrease >= 2) {
        result.push({
          id: 'appetite-return', title: 'Appetite suppression weakening',
          explanation: 'Hunger levels have increased over the last 4 weeks. This may indicate developing tolerance and could warrant dose adjustment discussion.',
          severity: 'amber', category: 'treatment',
        });
      }
    }
    // Glucose improvement
    if (data.length >= 4) {
      const glucoseDrop = data[0].fastingGlucose - currentWeek.fastingGlucose;
      if (glucoseDrop > 30) {
        result.push({
          id: 'glucose-improving', title: 'Fasting glucose trending down',
          explanation: `Fasting glucose reduced by ${glucoseDrop} mg/dL since baseline. This indicates improved insulin sensitivity, likely from combined effects of weight loss and medication.`,
          severity: 'green', category: 'trend',
        });
      }
    }
    return result.slice(0, 4);
  }, [data, currentWeek, plateau, adherenceScore, recentWeeks]);

  const nextActions = useMemo((): NextAction[] => {
    const actions: NextAction[] = [];
    // Safety first
    const severeEffects = currentWeek.sideEffects.filter(e => e.severity >= 3);
    if (severeEffects.length > 0) {
      actions.push({
        id: 'severe-se', action: 'Contact your doctor today — severe side effects reported',
        reason: 'Severe symptoms require medical review before continuing current dose.',
        priority: 'safety',
      });
    }
    // Adherence
    if (adherenceScore < 85) {
      actions.push({
        id: 'improve-adherence', action: 'Take medication consistently for the next 7 days',
        reason: `Your adherence is ${adherenceScore}%. Set a daily alarm for 30 minutes before breakfast.`,
        priority: 'adherence',
      });
    }
    // Plateau
    if (plateau.isPlateaued) {
      actions.push({
        id: 'plateau-action', action: 'Book consultation — dose adjustment may be needed',
        reason: 'Weight has plateaued. Your doctor may consider dose escalation if clinically appropriate.',
        priority: 'optimization',
      });
    }
    // Logging
    actions.push({
      id: 'log-weight', action: 'Log your fasting weight tomorrow morning',
      reason: 'Consistent weekly logging helps your doctor track trends and make informed decisions.',
      priority: 'optimization',
    });
    if (actions.length === 0) {
      actions.push({
        id: 'continue', action: 'Continue current treatment plan',
        reason: 'Your progress is on track. Maintain medication schedule and dietary plan.',
        priority: 'optimization',
      });
    }
    return actions.sort((a, b) => {
      const order = { safety: 0, adherence: 1, optimization: 2 };
      return order[a.priority] - order[b.priority];
    });
  }, [currentWeek, adherenceScore, plateau]);

  const doseRecommendation = useMemo((): DoseRecommendation => {
    const currentDose = currentWeek.doseMg;
    // Count weeks on current dose
    let weeksOnDose = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].doseMg === currentDose) weeksOnDose++;
      else break;
    }
    const hasSevereEffects = currentWeek.sideEffects.some(e => e.severity >= 3);
    const hasModerateEffects = currentWeek.sideEffects.some(e => e.severity >= 2);
    if (hasSevereEffects) {
      return { status: 'hold', reason: 'Severe side effects present. Hold current dose until symptoms resolve. Doctor review required.', currentDose, weeksOnDose };
    }
    if (hasModerateEffects && weeksOnDose < 4) {
      return { status: 'continue', reason: 'Moderate side effects present but may resolve with continued use. Continue current dose and monitor.', currentDose, weeksOnDose };
    }
    if (plateau.isPlateaued && weeksOnDose >= 4 && !hasModerateEffects) {
      return { status: 'escalate', reason: `Plateau detected after ${weeksOnDose} weeks on ${currentDose}mg. Dose escalation may be appropriate if tolerated.`, currentDose, weeksOnDose };
    }
    return { status: 'continue', reason: `Good response on current dose (${currentDose}mg). Continue and reassess at next scheduled review.`, currentDose, weeksOnDose };
  }, [data, currentWeek, plateau]);

  const metabolicScore = useMemo(() => {
    const totalLoss = data[0].weight - currentWeek.weight;
    const pctLoss = (totalLoss / data[0].weight) * 100;
    const weightScore = Math.min(pctLoss * 5, 30); // max 30
    const adherenceComponent = (adherenceScore / 100) * 35; // max 35
    const glucoseImprovement = Math.min(((data[0].fastingGlucose - currentWeek.fastingGlucose) / data[0].fastingGlucose) * 100, 20); // max 20  
    const hba1cImprovement = currentWeek.hba1c && data[0].hba1c ? Math.min((data[0].hba1c - currentWeek.hba1c) * 8, 15) : 8; // max 15
    const score = Math.round(Math.min(weightScore + adherenceComponent + glucoseImprovement + hba1cImprovement, 100));
    // Previous week score
    const prevWeek = data.length >= 2 ? data[data.length - 2] : data[0];
    const prevLoss = data[0].weight - prevWeek.weight;
    const prevPct = (prevLoss / data[0].weight) * 100;
    const prevScore = Math.round(Math.min(Math.min(prevPct * 5, 30) + adherenceComponent + Math.min(((data[0].fastingGlucose - prevWeek.fastingGlucose) / data[0].fastingGlucose) * 100, 20) + 8, 100));
    return { score, previousScore: prevScore, change: score - prevScore };
  }, [data, currentWeek, adherenceScore]);

  return {
    currentWeek,
    recentWeeks,
    adherenceScore,
    plateau,
    insights,
    nextActions,
    doseRecommendation,
    metabolicScore,
    totalWeightLoss: data[0].weight - currentWeek.weight,
    totalWeightLossPct: ((data[0].weight - currentWeek.weight) / data[0].weight) * 100,
    allData: data,
  };
}
