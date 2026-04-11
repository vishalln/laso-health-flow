export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  day: number;
  time: string;
}

export const initialChatMessages: ChatMessage[] = [
  { id: '1', sender: 'bot', text: "Welcome to Laso Health Support, Arjun. I'm your care coordinator. Your medication (Semaglutide 7mg) will arrive by April 14. Here's what to expect in the first week.", day: 1, time: '9:00 AM' },
  { id: '2', sender: 'bot', text: 'Take your tablet once daily, 30 minutes before your first meal. Swallow whole with a small sip of water (no more than 120ml). Do not crush or chew.', day: 1, time: '9:01 AM' },
  { id: '3', sender: 'bot', text: 'How are you feeling on the medication so far? Any nausea, stomach discomfort, or changes in appetite?', day: 3, time: '10:00 AM' },
  { id: '4', sender: 'user', text: 'Feeling a bit nauseous after taking it', day: 3, time: '10:15 AM' },
  { id: '5', sender: 'bot', text: "Mild nausea is one of the most common side effects — it occurs in approximately 20–40% of patients and usually improves within 2–4 weeks as your body adjusts. Try taking the tablet with a smaller meal, and avoid fatty or heavy foods. If nausea persists beyond 3 weeks or becomes severe, we'll notify your doctor.", day: 3, time: '10:16 AM' },
  { id: '6', sender: 'bot', text: "Weekly check-in: Please share your current weight and any symptoms you've experienced this week.", day: 7, time: '9:00 AM' },
  { id: '7', sender: 'user', text: '91.5 kg. Nausea is getting better. Appetite is noticeably lower.', day: 7, time: '11:30 AM' },
  { id: '8', sender: 'bot', text: "Thank you, Arjun. Weight recorded. Reduced appetite is an expected therapeutic effect of GLP-1 medication — it's how the drug works. Dr. Sharma will review your progress before your next consultation.", day: 7, time: '11:31 AM' },
  { id: '9', sender: 'bot', text: 'Reminder: Your follow-up consultation with Dr. Sharma is tomorrow at 4:30 PM. Please have your Zoom link ready.', day: 14, time: '9:00 AM' },
  { id: '10', sender: 'bot', text: "Dr. Sharma has updated your notes following today's consultation. Your dose will remain at 7mg for another 2 weeks before reassessment. Continue logging your weight weekly.", day: 15, time: '5:00 PM' },
];

export const autoReplies: { keywords: string[]; response: string }[] = [
  { keywords: ['nausea', 'nauseous', 'sick', 'vomit'], response: "Nausea is one of the most frequently reported side effects of GLP-1 medications. It typically occurs in the first 2–4 weeks and tends to diminish as your body adjusts. Eating smaller, blander meals can help. If it's persistent or severe, we'll escalate this to your doctor." },
  { keywords: ['weight', 'kg', 'weigh'], response: "Thank you for sharing. I've logged your weight. Your doctor will review the trend at your next consultation. Remember — week-to-week fluctuations are normal; the overall trend over weeks matters more." },
  { keywords: ['appointment', 'consultation', 'doctor', 'zoom'], response: 'Your next consultation with Dr. Sharma is scheduled for April 28 at 4:30 PM. You can join via the Zoom link in your dashboard.' },
  { keywords: ['side effect', 'headache', 'dizzy', 'diarrhea', 'constipation'], response: "Thank you for letting us know. I've noted this in your file. If the symptom is mild and manageable, it may resolve on its own. If it worsens or persists beyond a few days, we'll notify your doctor for review." },
  { keywords: ['dose', 'dosage', 'increase', 'change'], response: 'Dosage adjustments are made only by your prescribing physician, typically during monthly follow-ups. Please do not change your dose without medical guidance.' },
  { keywords: ['food', 'eat', 'diet', 'meal'], response: 'While on GLP-1 medications, focusing on smaller, protein-rich meals tends to improve tolerability. Avoid large, high-fat meals, especially in the first few weeks. Your care plan includes dietary guidance — would you like me to share it?' },
  { keywords: ['hello', 'hi', 'hey'], response: 'Hello, Arjun! How can I help you today? You can ask about your medication, appointments, or share any symptoms.' },
];
