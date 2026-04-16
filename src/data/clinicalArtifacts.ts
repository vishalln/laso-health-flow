// Post-consultation clinical artifacts — doctor notes, treatment plans, consult history

export interface DoctorNote {
  id: string;
  date: string;
  doctorName: string;
  consultType: 'initial' | 'follow-up' | 'urgent';
  summary: string;
  findings: string[];
  decisions: string[];
  nextSteps: string[];
}

export interface TreatmentPlan {
  id: string;
  createdDate: string;
  updatedDate: string;
  doctorName: string;
  diagnosis: string[];
  goals: TreatmentGoal[];
  medications: TreatmentMedication[];
  lifestyle: string[];
  monitoring: string[];
  followUpSchedule: string;
}

export interface TreatmentGoal {
  target: string;
  metric: string;
  timeframe: string;
  status: 'on-track' | 'behind' | 'achieved';
}

export interface TreatmentMedication {
  name: string;
  dose: string;
  frequency: string;
  titrationPlan: string;
  startDate: string;
}

export interface ConsultRecord {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  type: 'initial' | 'follow-up' | 'urgent';
  duration: string;
  summary: string;
  keyDecisions: string[];
}

export interface RefillStatus {
  medicationName: string;
  currentSupply: number; // days remaining
  dailyDose: string;
  adherenceRate: number; // 0-1
  estimatedRunOut: string; // date
  autoRefillDate: string;
  status: 'sufficient' | 'low' | 'critical';
}

// --- Mock data ---

export const doctorNotes: DoctorNote[] = [
  {
    id: 'note-1',
    date: 'January 26, 2026',
    doctorName: 'Dr. Rahul Sharma',
    consultType: 'initial',
    summary: 'Initial consultation for weight management. Patient presents with BMI 31.2 (Obese Class I), fasting glucose 178 mg/dL, HbA1c 8.4%. No contraindications to GLP-1 therapy identified.',
    findings: [
      'BMI 31.2 — Obese Class I',
      'Fasting glucose 178 mg/dL — above target',
      'HbA1c 8.4% — indicates poor glycemic control',
      'No history of pancreatitis, MTC, or MEN2',
      'No current pregnancy or planning',
    ],
    decisions: [
      'Initiate Semaglutide (Rybelsus) at 3mg daily — titration start dose',
      'Target dose escalation to 7mg after 4 weeks if tolerated',
      'Monitor weight weekly, fasting glucose biweekly',
      'Dietary counselling: smaller meals, protein-rich, avoid high-fat foods',
    ],
    nextSteps: [
      'Follow-up in 2 weeks to assess tolerability',
      'Blood work (fasting glucose) before next visit',
      'Patient to log weight and symptoms weekly via app',
    ],
  },
  {
    id: 'note-2',
    date: 'February 12, 2026',
    doctorName: 'Dr. Rahul Sharma',
    consultType: 'follow-up',
    summary: 'Two-week follow-up. Patient reports moderate nausea in first week, improving. Weight down 1.5 kg from baseline. Tolerating 3mg well. Approved escalation to 7mg.',
    findings: [
      'Weight: 90.5 kg (down 1.5 kg from 92 kg baseline)',
      'Nausea: moderate initially, now mild — expected GI adaptation',
      'Appetite suppression: present and therapeutic',
      'Fasting glucose: 162 mg/dL (improved from 178)',
      'Adherence: 100% first 2 weeks',
    ],
    decisions: [
      'Escalate Semaglutide from 3mg → 7mg daily',
      'Continue current dietary plan',
      'Monitor for GI side effects at higher dose',
    ],
    nextSteps: [
      'Next follow-up at week 8 (1 month on 7mg)',
      'If persistent GI issues at 7mg, may hold dose',
      'HbA1c recheck at month 3',
    ],
  },
  {
    id: 'note-3',
    date: 'March 21, 2026',
    doctorName: 'Dr. Rahul Sharma',
    consultType: 'follow-up',
    summary: 'Month 2 review. Weight plateau observed (88.5 kg — only 0.3 kg loss in last 3 weeks). HbA1c improved to 7.6%. Adherence dipped to ~80%. Discussing dose escalation to 14mg.',
    findings: [
      'Weight: 88.5 kg — plateau for 3 weeks (<0.3 kg/week loss)',
      'HbA1c: 7.6% (improved from 8.4% at baseline — significant)',
      'Fasting glucose: 140 mg/dL',
      'Adherence: ~80% — 2 missed doses in recent weeks',
      'Appetite suppression weakening — hunger levels increasing',
      'Side effects resolved — good tolerability at 7mg',
    ],
    decisions: [
      'Escalate Semaglutide from 7mg → 14mg daily',
      'Counsel on adherence — importance of consistent dosing',
      'Add 20-minute post-dinner walk to routine',
      'Continue monitoring weight weekly',
    ],
    nextSteps: [
      'Reassess at week 12 (month 3)',
      'HbA1c recheck at month 3 visit',
      'If plateau persists on 14mg, consider adjunct therapy',
    ],
  },
  {
    id: 'note-4',
    date: 'April 16, 2026',
    doctorName: 'Dr. Rahul Sharma',
    consultType: 'follow-up',
    summary: 'Month 3 review. Excellent response after dose escalation. Weight 85.8 kg (total 6.2 kg / 6.7% loss). HbA1c 7.1%. Recommend continuing 14mg.',
    findings: [
      'Weight: 85.8 kg (6.2 kg total loss — 6.7% of starting weight)',
      'HbA1c: 7.1% (improved from 7.6% — approaching target)',
      'Fasting glucose: 122 mg/dL — nearing normal range',
      'Adherence: improved to ~95% after counselling',
      'No significant side effects on 14mg',
      'Appetite well controlled at current dose',
    ],
    decisions: [
      'Continue Semaglutide 14mg daily — good response',
      'Target HbA1c <7.0% by month 6',
      'Weight target: 82-83 kg by month 6 (10% total loss)',
      'Maintain dietary and exercise modifications',
    ],
    nextSteps: [
      'Next follow-up: month 6 (comprehensive review)',
      'Blood panel including HbA1c, lipids, renal function',
      'Consider maintenance phase planning if targets met',
    ],
  },
];

export const treatmentPlan: TreatmentPlan = {
  id: 'tp-001',
  createdDate: 'January 26, 2026',
  updatedDate: 'April 16, 2026',
  doctorName: 'Dr. Rahul Sharma',
  diagnosis: [
    'Obesity Class I (BMI 31.2)',
    'Type 2 Diabetes Mellitus (HbA1c 8.4% at diagnosis)',
  ],
  goals: [
    { target: '10% body weight reduction', metric: '92 kg → 82.8 kg', timeframe: '6 months', status: 'on-track' },
    { target: 'HbA1c below 7.0%', metric: '8.4% → <7.0%', timeframe: '6 months', status: 'on-track' },
    { target: 'Fasting glucose <130 mg/dL', metric: '178 → <130 mg/dL', timeframe: '3 months', status: 'achieved' },
    { target: 'Consistent medication adherence >90%', metric: 'Current: 95%', timeframe: 'Ongoing', status: 'on-track' },
  ],
  medications: [
    {
      name: 'Semaglutide (Rybelsus)',
      dose: '14mg daily',
      frequency: 'Once daily, 30 min before first meal with ≤120ml water',
      titrationPlan: '3mg (wk 1-2) → 7mg (wk 3-8) → 14mg (wk 9+)',
      startDate: 'January 26, 2026',
    },
  ],
  lifestyle: [
    'Protein-rich meals — aim for 25-30g protein per meal',
    'Smaller, more frequent meals (4-5 per day) to manage GI tolerability',
    'Avoid high-fat, fried foods — especially in first 4 weeks',
    '20-minute walk after dinner — daily',
    'Minimum 7 hours sleep per night',
    'Hydration: 2-3 litres water daily (but ≤120ml with medication)',
  ],
  monitoring: [
    'Weekly weight logging (fasting, morning)',
    'Weekly symptom check-in via app',
    'Fasting glucose: biweekly',
    'HbA1c: every 3 months',
    'Renal function panel: every 6 months',
    'Lipid profile: every 6 months',
  ],
  followUpSchedule: 'Monthly video consultations with Dr. Sharma. Next: May 2026.',
};

export const consultHistory: ConsultRecord[] = [
  {
    id: 'consult-1',
    date: 'January 26, 2026',
    time: '10:00 AM',
    doctorName: 'Dr. Rahul Sharma',
    type: 'initial',
    duration: '25 minutes',
    summary: 'Initial evaluation. Started Semaglutide 3mg. Set treatment goals.',
    keyDecisions: ['Initiated GLP-1 therapy', 'Set 6-month weight target: 10% reduction'],
  },
  {
    id: 'consult-2',
    date: 'February 12, 2026',
    time: '4:30 PM',
    doctorName: 'Dr. Rahul Sharma',
    type: 'follow-up',
    duration: '15 minutes',
    summary: 'Good early response. Dose escalated 3mg → 7mg.',
    keyDecisions: ['Dose escalation approved', 'Continued monitoring plan'],
  },
  {
    id: 'consult-3',
    date: 'March 21, 2026',
    time: '2:00 PM',
    doctorName: 'Dr. Rahul Sharma',
    type: 'follow-up',
    duration: '20 minutes',
    summary: 'Plateau at 88.5 kg. HbA1c improved. Dose escalated to 14mg.',
    keyDecisions: ['Dose escalation 7mg → 14mg', 'Added exercise component', 'Adherence counselling'],
  },
  {
    id: 'consult-4',
    date: 'April 16, 2026',
    time: '4:30 PM',
    doctorName: 'Dr. Rahul Sharma',
    type: 'follow-up',
    duration: '15 minutes',
    summary: 'Excellent recovery. Total 6.7% weight loss. HbA1c 7.1%.',
    keyDecisions: ['Continue 14mg', 'Target HbA1c <7.0% by month 6'],
  },
];

export const refillStatus: RefillStatus = {
  medicationName: 'Semaglutide (Rybelsus) 14mg',
  currentSupply: 8,
  dailyDose: '14mg once daily',
  adherenceRate: 0.95,
  estimatedRunOut: 'April 24, 2026',
  autoRefillDate: 'April 22, 2026',
  status: 'low',
};

// Order history for the enhanced orders page
export interface OrderRecord {
  id: string;
  date: string;
  items: { name: string; quantity: string; price: number }[];
  total: number;
  status: 'delivered' | 'in-transit' | 'processing' | 'cancelled';
  deliveryDate: string;
  trackingId: string;
}

export const orderHistory: OrderRecord[] = [
  {
    id: 'LASO-2026-00847',
    date: 'April 10, 2026',
    items: [
      { name: 'Semaglutide (Rybelsus) 14mg × 30', quantity: '1', price: 5200 },
      { name: 'Consultation fee', quantity: '1', price: 599 },
      { name: 'Delivery', quantity: '1', price: 0 },
    ],
    total: 5799,
    status: 'in-transit',
    deliveryDate: 'April 16, 2026',
    trackingId: 'BD9847362510',
  },
  {
    id: 'LASO-2026-00721',
    date: 'March 10, 2026',
    items: [
      { name: 'Semaglutide (Rybelsus) 7mg × 30', quantity: '1', price: 4500 },
      { name: 'Delivery', quantity: '1', price: 0 },
    ],
    total: 4500,
    status: 'delivered',
    deliveryDate: 'March 12, 2026',
    trackingId: 'BD9832156478',
  },
  {
    id: 'LASO-2026-00583',
    date: 'February 8, 2026',
    items: [
      { name: 'Semaglutide (Rybelsus) 7mg × 30', quantity: '1', price: 4500 },
      { name: 'Consultation fee', quantity: '1', price: 599 },
      { name: 'Delivery', quantity: '1', price: 0 },
    ],
    total: 5099,
    status: 'delivered',
    deliveryDate: 'February 10, 2026',
    trackingId: 'BD9817432901',
  },
  {
    id: 'LASO-2026-00412',
    date: 'January 26, 2026',
    items: [
      { name: 'Semaglutide (Rybelsus) 3mg × 30', quantity: '1', price: 3800 },
      { name: 'Initial consultation fee', quantity: '1', price: 999 },
      { name: 'Delivery', quantity: '1', price: 0 },
    ],
    total: 4799,
    status: 'delivered',
    deliveryDate: 'January 28, 2026',
    trackingId: 'BD9801234567',
  },
];
