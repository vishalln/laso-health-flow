export const weightLossPrescription = {
  doctorName: 'Dr. Rahul Sharma',
  medications: [
    {
      name: 'Semaglutide (Rybelsus)',
      currentDose: '7mg',
      targetDose: '14mg',
      schedule: 'Once daily, 30 minutes before first meal, with no more than 120ml of water',
      startedWeeksAgo: 6,
      nextEscalation: 'May 5, 2026',
      nextRefill: 'April 25, 2026',
    },
  ],
  note: 'Do not adjust dosage without consulting your doctor.',
};

export const diabetesPrescription = {
  doctorName: 'Dr. Anjali Deshmukh',
  medications: [
    {
      name: 'Metformin',
      currentDose: '1000mg',
      targetDose: '1000mg',
      schedule: 'Twice daily with meals (500mg morning, 500mg evening)',
      startedWeeksAgo: 12,
      nextEscalation: 'Stable — no escalation planned',
      nextRefill: 'April 22, 2026',
    },
    {
      name: 'Liraglutide (Victoza)',
      currentDose: '1.2mg',
      targetDose: '1.8mg',
      schedule: 'Once daily subcutaneous injection, any time of day',
      startedWeeksAgo: 8,
      nextEscalation: 'May 1, 2026',
      nextRefill: 'April 22, 2026',
    },
  ],
  note: 'Do not adjust dosage without consulting your doctor.',
};

export const weightData = [
  { week: 'Wk 1', weight: 92 },
  { week: 'Wk 2', weight: 91.5 },
  { week: 'Wk 3', weight: 91.8 },
  { week: 'Wk 4', weight: 90.9 },
  { week: 'Wk 5', weight: 90.4 },
  { week: 'Wk 6', weight: 89.7 },
  { week: 'Wk 7', weight: 89.3 },
  { week: 'Wk 8', weight: 88.4 },
  { week: 'Wk 9', weight: 88.6 },
  { week: 'Wk 10', weight: 87.8 },
  { week: 'Wk 11', weight: 87.2 },
  { week: 'Wk 12', weight: 86.5 },
];

export const bloodSugarData = [
  { day: 'Day 1', fasting: 178 },
  { day: 'Day 5', fasting: 172 },
  { day: 'Day 10', fasting: 165 },
  { day: 'Day 15', fasting: 158 },
  { day: 'Day 20', fasting: 148 },
  { day: 'Day 25', fasting: 142 },
  { day: 'Day 30', fasting: 138 },
  { day: 'Day 40', fasting: 135 },
  { day: 'Day 50', fasting: 128 },
  { day: 'Day 60', fasting: 125 },
  { day: 'Day 70', fasting: 122 },
  { day: 'Day 80', fasting: 118 },
];

export const hba1cData = [
  { period: 'Baseline', value: 8.4 },
  { period: 'Month 3', value: 7.6 },
  { period: 'Month 6', value: 7.1 },
];
