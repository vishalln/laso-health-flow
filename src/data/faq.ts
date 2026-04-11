export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'What medications do you prescribe for weight loss?',
    answer: 'Our physicians may prescribe GLP-1 receptor agonists such as liraglutide or semaglutide, depending on your health profile. These are FDA and CDSCO-approved medications with extensive clinical trial data. Not all patients are eligible — your doctor determines suitability during consultation.',
  },
  {
    question: 'Is this safe?',
    answer: 'All medications we use have been evaluated in large-scale clinical trials. Like any prescription medication, they carry potential side effects. The most common are gastrointestinal (nausea, occurring in approximately 20–40% of patients, typically resolving within 2–4 weeks). Your doctor will discuss all risks and benefits before prescribing.',
  },
  {
    question: 'How much weight can I expect to lose?',
    answer: 'In clinical trials, semaglutide 2.4mg resulted in average weight loss of 14.9% of body weight over 68 weeks (STEP 1 trial). Liraglutide 3.0mg showed average weight loss of 8% over 56 weeks (SCALE trial). Individual results depend on dosage, adherence, diet, and exercise. Your doctor will set realistic expectations based on your specific situation.',
  },
  {
    question: 'What about diabetes management?',
    answer: 'We use first-line medications like metformin, which lowers HbA1c by approximately 1–1.5% as monotherapy. For patients requiring additional glycemic control, GLP-1 receptor agonists offer both blood sugar reduction and cardiovascular benefits. All medication decisions are made by your physician.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. There are no long-term contracts. You can pause or stop treatment at any time after consulting with your doctor about safe discontinuation.',
  },
  {
    question: 'How are consultations conducted?',
    answer: 'All consultations are conducted via secure video call. Your doctor reviews your health assessment beforehand and spends 15–20 minutes discussing your health, treatment options, and answering questions.',
  },
];
