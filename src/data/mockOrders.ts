export interface OrderItem {
  name: string;
  quantity: string;
  price: number;
}

export interface OrderStep {
  label: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export const mockOrder = {
  id: 'LASO-2024-00847',
  placedDate: 'April 10, 2026',
  items: [
    { name: 'Semaglutide (Rybelsus) 7mg × 30 tablets', quantity: '1', price: 4500 },
    { name: 'Consultation fee (Dr. Rahul Sharma)', quantity: '1', price: 599 },
    { name: 'Delivery', quantity: '1', price: 0 },
  ] as OrderItem[],
  total: 5099,
  pharmacy: {
    name: 'MedPlus Pharmacy, Andheri West, Mumbai',
    license: 'MH/MUM/20-1234/2023',
    note: 'All medications are sourced from authorised distributors and stored per manufacturer specifications.',
  },
  delivery: {
    address: 'Flat 402, Sai Krupa Apartments, Bandra West, Mumbai 400050',
    estimatedTime: 'Today by 6:00 PM',
    trackingId: 'BD9847362510',
    carrier: 'BlueDart',
  },
  steps: [
    { label: 'Order confirmed', timestamp: 'Apr 10, 9:15 AM', completed: true, active: false },
    { label: 'Prescription verified by pharmacy', timestamp: 'Apr 10, 10:30 AM', completed: true, active: false },
    { label: 'Packed in temperature-controlled packaging', timestamp: 'Apr 10, 2:00 PM', completed: true, active: false },
    { label: 'Shipped via BlueDart — Tracking: BD9847362510', timestamp: 'Apr 10, 5:45 PM', completed: true, active: false },
    { label: 'Out for delivery', timestamp: 'Expected by 6:00 PM today', completed: false, active: true },
    { label: 'Delivered', timestamp: '', completed: false, active: false },
  ] as OrderStep[],
};
