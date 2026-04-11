export interface Testimonial {
  name: string;
  age: number;
  city: string;
  program: 'weight-loss' | 'diabetes';
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Priya Mehta',
    age: 34,
    city: 'Mumbai',
    program: 'weight-loss',
    quote: 'Lost 9 kg over 4 months with semaglutide under Dr. Sharma\'s supervision. Mild nausea in the first two weeks, which resolved on its own. My appetite is more manageable now.',
  },
  {
    name: 'Rajesh Iyer',
    age: 52,
    city: 'Bangalore',
    program: 'diabetes',
    quote: 'My HbA1c dropped from 8.6% to 7.2% in 5 months on metformin and liraglutide. Dr. Deshmukh adjusted my doses carefully based on my blood work each month.',
  },
  {
    name: 'Sneha Kulkarni',
    age: 41,
    city: 'Pune',
    program: 'weight-loss',
    quote: 'After years of yo-yo dieting, having a doctor actually monitor my progress and adjust treatment made a real difference. Lost 11 kg over 6 months — slowly but consistently.',
  },
  {
    name: 'Amit Verma',
    age: 47,
    city: 'Delhi',
    program: 'diabetes',
    quote: 'The monthly consultations keep me accountable. My fasting glucose went from 180 to around 120 mg/dL over 4 months. The support team answers questions within hours.',
  },
  {
    name: 'Kavitha Nair',
    age: 38,
    city: 'Chennai',
    program: 'weight-loss',
    quote: 'The whole process felt very professional. The doctor explained every side effect before starting. I lost 7 kg in 3 months and my energy levels have improved noticeably.',
  },
];
