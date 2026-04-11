export interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  mciReg: string;
  experience: number;
  specialty: string;
  rating: number;
  consultations: number;
  avatar: string;
}

export const doctors: Doctor[] = [
  {
    id: 'dr-sharma',
    name: 'Dr. Rahul Sharma',
    qualifications: 'MBBS, MD (Internal Medicine), Fellowship in Diabetes Management',
    mciReg: 'MH/2015/04523',
    experience: 8,
    specialty: 'Specializes in metabolic disorders and medical weight management',
    rating: 4.8,
    consultations: 127,
    avatar: '👨‍⚕️',
  },
  {
    id: 'dr-deshmukh',
    name: 'Dr. Anjali Deshmukh',
    qualifications: 'MBBS, MD (Endocrinology)',
    mciReg: 'KA/2012/03891',
    experience: 11,
    specialty: 'Expert in Type 2 diabetes management and thyroid disorders',
    rating: 4.9,
    consultations: 203,
    avatar: '👩‍⚕️',
  },
  {
    id: 'dr-patel',
    name: 'Dr. Vikram Patel',
    qualifications: 'MBBS, DNB (General Medicine), CDE (Certified Diabetes Educator)',
    mciReg: 'DL/2016/05234',
    experience: 6,
    specialty: 'Focused on lifestyle medicine and GLP-1 based weight management',
    rating: 4.7,
    consultations: 89,
    avatar: '👨‍⚕️',
  },
];
