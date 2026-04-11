

## Laso — Telehealth Mock Web App (Detailed Plan)

### Architecture Overview

```text
src/
├── contexts/
│   └── UserContext.tsx          # Global state: quiz data, program, booking, auth
├── data/
│   ├── doctors.ts               # Doctor profiles with credentials
│   ├── medications.ts           # Drug info with evidence-based outcomes
│   ├── testimonials.ts          # Realistic patient stories
│   ├── chatMessages.ts          # Pre-loaded support conversations
│   ├── faq.ts                   # FAQ content
│   └── mockOrders.ts            # Order & pharmacy data
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ProgramCards.tsx
│   │   ├── TrustSignals.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── quiz/
│   │   ├── QuizProgress.tsx
│   │   ├── StepAge.tsx
│   │   ├── StepGender.tsx
│   │   ├── StepBodyMetrics.tsx   # Height/weight with auto BMI
│   │   ├── StepConditions.tsx
│   │   ├── StepHistory.tsx
│   │   ├── StepHbA1c.tsx
│   │   ├── StepContraindications.tsx
│   │   └── QuizResult.tsx
│   ├── consult/
│   │   ├── DoctorCard.tsx
│   │   ├── SlotPicker.tsx
│   │   ├── BookingConfirmation.tsx
│   │   └── EmailConfirmationModal.tsx
│   ├── dashboard/
│   │   ├── WelcomeCard.tsx
│   │   ├── ProgramSwitcher.tsx
│   │   ├── PrescriptionCard.tsx
│   │   ├── WeightChart.tsx
│   │   ├── BloodSugarChart.tsx
│   │   ├── UpcomingActions.tsx
│   │   └── ReminderLog.tsx
│   ├── support/
│   │   ├── ChatBubble.tsx
│   │   ├── ChatInput.tsx
│   │   └── TypingIndicator.tsx
│   ├── orders/
│   │   ├── OrderSummary.tsx
│   │   └── DeliveryTracker.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   └── PageWrapper.tsx
│   └── shared/
│       ├── LoginGate.tsx
│       └── DisclaimerBanner.tsx
├── pages/
│   ├── Index.tsx         # Landing
│   ├── Quiz.tsx
│   ├── Consult.tsx
│   ├── Dashboard.tsx
│   ├── Support.tsx
│   ├── Orders.tsx
│   └── Login.tsx
└── lib/
    └── bmiCalculator.ts
```

---

### Design System

- **Primary**: Deep teal `#0D9488` (medical trust)
- **Secondary**: Warm slate `#475569`
- **Background**: `#FAFAF9` (warm white), cards `#FFFFFF`
- **Accent**: Amber `#F59E0B` for CTAs and highlights
- **Error/Warning**: Rose `#E11D48`
- **Success**: Emerald `#059669`
- **Typography**: Inter (body), system sans-serif headings, clean and spacious
- **Spacing**: Generous whitespace, 8px grid system
- **Border radius**: Soft rounded (12px cards, 8px buttons)
- **Shadows**: Subtle, layered (`shadow-sm` to `shadow-lg`)

---

### Page-by-Page Detailed Specification

---

#### 1. Landing Page (`/`)

**Hero Section**
- Headline: "Doctor-led weight loss & diabetes care that actually works"
- Subtext: "Clinically supervised. Evidence-based medications. Delivered to your door."
- Two CTAs: "Check Your Eligibility" (primary), "Learn How It Works" (secondary scroll link)
- Background: Subtle gradient with abstract medical illustration or clean imagery
- No stock photos of pills or syringes — clean, trustworthy aesthetic

**How It Works — 5 Steps**
Each step shown as a numbered card with icon:
1. **Complete a health assessment** — "Answer questions about your health history, current medications, and goals. Takes about 3 minutes."
2. **Consult with a licensed physician** — "A board-certified doctor reviews your profile and conducts a video consultation to evaluate your suitability for treatment."
3. **Receive your personalised prescription** — "If clinically appropriate, your doctor prescribes FDA/CDSCO-approved medication tailored to your condition."
4. **Medication delivered to your home** — "Your prescription is fulfilled by a licensed pharmacy and shipped in discreet, temperature-controlled packaging."
5. **Ongoing medical supervision** — "Monthly follow-ups with your doctor, progress tracking, and dedicated support throughout your treatment."

**Program Cards — Toggle between Weight Loss & Diabetes**
Toggle switch at top. Each card shows:

*Weight Loss Program:*
- "Medically supervised weight management using GLP-1 receptor agonists"
- "Clinical evidence: Patients on semaglutide lost an average of 10-15% of body weight over 68 weeks in the STEP trials. Liraglutide (3.0mg) showed average weight loss of 5-8% of body weight over 56 weeks."
- "Treatment is prescribed only after physician evaluation and is not suitable for everyone."
- Includes: Doctor consultation, prescription (if appropriate), monthly follow-ups, dietary guidance, progress monitoring

*Diabetes Management Program:*
- "Structured Type 2 diabetes management with evidence-based medications"
- "Clinical evidence: Metformin monotherapy lowers HbA1c by approximately 1.12% on average (95% CI: 0.92-1.32%). GLP-1 receptor agonists can provide additional HbA1c reduction of 1.0-1.8% depending on baseline levels."
- "All treatment decisions are made by your physician based on your individual health profile."
- Includes: HbA1c monitoring, medication management, dietary planning, complication screening

**Trust Signals Section**
Three cards:
- **Licensed Physicians** — "All consultations conducted by doctors registered with the Medical Council of India (MCI). Minimum 5 years clinical experience in endocrinology or internal medicine."
- **Verified Pharmacy Partners** — "Medications dispensed by pharmacies licensed under the Drugs and Cosmetics Act, 1940. All drugs are Schedule H compliant and sourced from verified manufacturers."
- **Continuous Medical Oversight** — "Your doctor monitors your progress monthly. Treatment is adjusted or discontinued based on clinical response and tolerability."

**Testimonials**
4-5 testimonials with realistic Indian names. Each includes:
- Name, age, city (e.g., "Priya Mehta, 34, Mumbai")
- Program type
- Specific, measured outcome (e.g., "Lost 9 kg over 4 months with semaglutide under Dr. Sharma's supervision. Mild nausea in the first two weeks, which resolved on its own.")
- **Mandatory disclaimer** below all testimonials: "Individual results vary based on adherence, baseline health, and clinical factors. These accounts reflect personal experiences and should not be interpreted as guaranteed outcomes."

**FAQ Section**
Questions with expand/collapse:
- "What medications do you prescribe for weight loss?" — "Our physicians may prescribe GLP-1 receptor agonists such as liraglutide or semaglutide, depending on your health profile. These are FDA and CDSCO-approved medications with extensive clinical trial data. Not all patients are eligible — your doctor determines suitability during consultation."
- "Is this safe?" — "All medications we use have been evaluated in large-scale clinical trials. Like any prescription medication, they carry potential side effects. The most common are gastrointestinal (nausea, occurring in approximately 20-40% of patients, typically resolving within 2-4 weeks). Your doctor will discuss all risks and benefits before prescribing."
- "How much weight can I expect to lose?" — "In clinical trials, semaglutide 2.4mg resulted in average weight loss of 14.9% of body weight over 68 weeks (STEP 1 trial). Liraglutide 3.0mg showed average weight loss of 8% over 56 weeks (SCALE trial). Individual results depend on dosage, adherence, diet, and exercise. Your doctor will set realistic expectations based on your specific situation."
- "What about diabetes management?" — "We use first-line medications like metformin, which lowers HbA1c by approximately 1-1.5% as monotherapy. For patients requiring additional glycemic control, GLP-1 receptor agonists offer both blood sugar reduction and cardiovascular benefits. All medication decisions are made by your physician."
- "Can I cancel anytime?" — "Yes. There are no long-term contracts. You can pause or stop treatment at any time after consulting with your doctor about safe discontinuation."
- "How are consultations conducted?" — "All consultations are conducted via secure video call. Your doctor reviews your health assessment beforehand and spends 15-20 minutes discussing your health, treatment options, and answering questions."

**Footer**
- Links to all pages, privacy policy (placeholder), terms (placeholder)
- "Laso Health Technologies Pvt. Ltd."
- "This platform does not replace emergency medical care. If you are experiencing a medical emergency, call 112."

---

#### 2. Eligibility Quiz (`/quiz`)

**8 Steps with progress bar (percentage + step count)**

**Step 1 — Age**
- Number input, range 18-75
- Validation: Under 18 → "This program is available for adults aged 18 and above."

**Step 2 — Gender**
- Options: Male, Female, Non-binary, Prefer not to say
- Stored for clinical context (dosing, risk factors)

**Step 3 — Body Metrics**
- Height: dropdown (cm) or feet/inches toggle
- Weight: input (kg)
- Auto BMI calculation displayed: "Your BMI: 31.2 (Obese Class I)"
- BMI categories shown with user's position highlighted
- For weight loss: BMI < 25 → "Based on your BMI, you may not be eligible for weight loss medication. A doctor can discuss other options during consultation."

**Step 4 — Program Selection**
- "What are you seeking help with?"
- Options: Weight Loss, Type 2 Diabetes Management, Both
- This determines the rest of the flow

**Step 5 — Existing Conditions**
- Multi-select checkboxes: Type 2 Diabetes, Hypertension, PCOS, Thyroid disorder, Heart disease, Kidney disease, Liver disease, None of the above
- Heart/kidney/liver disease flagged for additional screening

**Step 6 — Current Medications**
- Text input: "List any medications you currently take"
- Checkbox: "I am not currently taking any medications"

**Step 7 — Contraindication Screening**
- "Are you pregnant or planning to become pregnant?" (Yes → flag: "GLP-1 medications are contraindicated during pregnancy. Please consult your physician in person.")
- "Do you have a personal or family history of medullary thyroid carcinoma or MEN 2 syndrome?" (Yes → flag: "Based on your response, GLP-1 receptor agonists may not be appropriate. A doctor will review your case.")
- "Have you been diagnosed with Type 1 diabetes or diabetic ketoacidosis?" (Yes → flag: "This program is designed for Type 2 diabetes. Please consult your endocrinologist for Type 1 management.")

**Step 8 — HbA1c (conditional, shown only for diabetes program)**
- "Do you know your most recent HbA1c level?"
- Options: Yes (input field, 4.0-14.0%), No / I don't know, Haven't been tested
- If provided, shown in dashboard later

**Result Screen**
- If no contraindication flags: "Based on your responses, you may be a candidate for our [Weight Loss / Diabetes] program. The next step is a consultation with one of our physicians, who will review your health profile and determine the most appropriate treatment plan."
- CTA: "Book Your Consultation" → `/consult`
- If flagged: "Based on some of your responses, we recommend an in-person consultation with a specialist before proceeding. Our team will follow up with guidance." — CTA: "We'll be in touch" (disabled booking)
- Small print: "This assessment does not constitute a medical diagnosis. All treatment decisions are made by a licensed physician during your consultation."

---

#### 3. Consultation Booking (`/consult`)

**Doctor Selection**
Show 3 doctor cards:

*Dr. Rahul Sharma*
- MBBS, MD (Internal Medicine), Fellowship in Diabetes Management
- MCI Reg: MH/2015/04523
- 8 years clinical experience
- "Specializes in metabolic disorders and medical weight management"
- Rating: 4.8/5 (127 consultations on Laso)

*Dr. Anjali Deshmukh*
- MBBS, MD (Endocrinology)
- MCI Reg: KA/2012/03891
- 11 years clinical experience
- "Expert in Type 2 diabetes management and thyroid disorders"
- Rating: 4.9/5 (203 consultations on Laso)

*Dr. Vikram Patel*
- MBBS, DNB (General Medicine), CDE (Certified Diabetes Educator)
- MCI Reg: DL/2016/05234
- 6 years clinical experience
- "Focused on lifestyle medicine and GLP-1 based weight management"
- Rating: 4.7/5 (89 consultations on Laso)

**Slot Picker**
- Calendar view showing next 7 days
- Available slots: 10:00 AM, 11:30 AM, 2:00 PM, 4:30 PM, 6:00 PM (mock)
- Some slots greyed out (booked)
- On selection: "15-minute video consultation with Dr. [Name] on [Date] at [Time]"

**Booking Confirmation Screen**
On confirm:
- Green checkmark animation
- "Your consultation is confirmed"
- Details card:
  - Doctor name & photo
  - Date & time
  - Duration: 15-20 minutes
  - Zoom link: `https://zoom.us/j/1234567890` (dummy, clickable but non-functional)
  - "Join from any device with a camera and microphone"
- "What to expect" section:
  - "Your doctor has received your health assessment and will review it before your call."
  - "Be prepared to discuss your health goals, current medications, and any concerns."
  - "The doctor will determine if medication is clinically appropriate for you."
- Email confirmation modal pops up showing a simulated email:
  - From: "Laso Health <appointments@laso.health>"
  - Subject: "Your consultation with Dr. Sharma is confirmed"
  - Body with all booking details + Zoom link + "Add to Calendar" button

**Reminder System (shown on confirmation page)**
- Timeline card:
  - ✅ "Booking confirmed — [timestamp]"
  - 🔔 "Email confirmation sent"
  - 📞 "Reminder call scheduled for [date - 1 day] at 10:00 AM"
  - After simulated delay: ✅ "Reminder call completed — User confirmed attendance"

---

#### 4. Dashboard (`/dashboard`)

**Login Gate**
- Simple mock login: email + password (any input works)
- "Demo mode — enter any credentials to continue"
- Stores login state in context

**Welcome Section**
- "Welcome back, [Name from quiz or 'Arjun']"
- Active program badge: "Weight Loss Program" or "Diabetes Management Program"
- Program switcher toggle to view either dashboard

**Weight Loss Dashboard View:**

*Prescription Card*
- "Current Prescription — as prescribed by Dr. Rahul Sharma"
- Medication: Semaglutide (Rybelsus) 7mg → 14mg
- Schedule: "Once daily, 30 minutes before first meal, with no more than 120ml of water"
- Duration: "Started 6 weeks ago. Next dose escalation review: [date]"
- Refill status: "Next refill ships on [date]"
- Note: "Do not adjust dosage without consulting your doctor."

*Weight Progress Chart (Recharts line graph)*
- X-axis: Weeks (Week 1 through Week 12)
- Y-axis: Weight in kg
- Data showing realistic non-linear progression:
  - Week 1: 92 kg (start)
  - Week 2: 91.5 kg
  - Week 3: 91.8 kg (slight bounce — realistic)
  - Week 4: 90.9 kg
  - Week 6: 89.7 kg
  - Week 8: 88.4 kg
  - Week 10: 87.8 kg
  - Week 12: 86.5 kg
- Annotation: "5.5 kg lost (6.0% of starting weight)"
- Note below chart: "Weight fluctuations are normal. Trends over weeks matter more than daily changes."

*Diabetes Dashboard View:*

*Prescription Card*
- Medication 1: Metformin 500mg → 1000mg (titrated)
- Medication 2: (if applicable) Liraglutide 0.6mg → 1.2mg
- Schedule and notes similar

*Blood Sugar / HbA1c Chart*
- Two views: Toggle between "Daily Blood Sugar" and "HbA1c Trend"
- Daily: Line chart showing fasting glucose readings (realistic range: 110-180 mg/dL, trending down)
- HbA1c: Bar/line chart showing quarterly readings:
  - Baseline: 8.4%
  - Month 3: 7.6% (Metformin effect: ~0.8% reduction)
  - Month 6: 7.1% (continued improvement)
- Target zone highlighted: 6.5-7.0%
- Note: "HbA1c reflects average blood sugar over 2-3 months. Changes take time to appear."

**Upcoming Actions**
- Card: "Next consultation — Dr. Sharma, [date], 4:30 PM" with Zoom link
- Card: "Weekly check-in due — Log your weight and any symptoms"
- Card: "Blood work reminder — Schedule fasting glucose test before next consultation"

**Reminder Log**
- Timeline showing:
  - "Medication reminder sent — 8:45 AM today"
  - "Weekly check-in completed — 2 days ago"
  - "Consultation reminder call — completed yesterday"

---

#### 5. Support Chat (`/support`)

**WhatsApp-style interface** — green/white theme with chat bubbles

**Pre-loaded conversation thread:**

*Day 1:*
- Laso: "Welcome to Laso Health Support, Arjun. I'm your care coordinator. Your medication (Semaglutide 7mg) will arrive by [date]. Here's what to expect in the first week."
- Laso: "Take your tablet once daily, 30 minutes before your first meal. Swallow whole with a small sip of water (no more than 120ml). Do not crush or chew."

*Day 3:*
- Laso: "How are you feeling on the medication so far? Any nausea, stomach discomfort, or changes in appetite?"
- User: "Feeling a bit nauseous after taking it"
- Laso: "Mild nausea is one of the most common side effects — it occurs in approximately 20-40% of patients and usually improves within 2-4 weeks as your body adjusts. Try taking the tablet with a smaller meal, and avoid fatty or heavy foods. If nausea persists beyond 3 weeks or becomes severe, we'll notify your doctor."

*Day 7:*
- Laso: "Weekly check-in: Please share your current weight and any symptoms you've experienced this week."
- User: "91.5 kg. Nausea is getting better. Appetite is noticeably lower."
- Laso: "Thank you, Arjun. Weight recorded. Reduced appetite is an expected therapeutic effect of GLP-1 medication — it's how the drug works. Dr. Sharma will review your progress before your next consultation."

*Day 14:*
- Laso: "Reminder: Your follow-up consultation with Dr. Sharma is tomorrow at 4:30 PM. Please have your Zoom link ready."

*Day 15:*
- Laso: "Dr. Sharma has updated your notes following today's consultation. Your dose will remain at 7mg for another 2 weeks before reassessment. Continue logging your weight weekly."

**User can type new messages** → auto-replies from a set of contextual responses (keyword matching: "side effect" → clinical info, "weight" → logging prompt, "appointment" → next consultation info, etc.)

**Typing indicator** (animated dots) shown for 1-2 seconds before bot response.

---

#### 6. Orders & Delivery (`/orders`)

**Order Summary Card**
- Order #LASO-2024-00847
- Placed: [date]
- Items:
  - Semaglutide (Rybelsus) 7mg × 30 tablets — ₹4,500
  - Consultation fee (Dr. Rahul Sharma) — ₹599
  - Delivery — Free
  - **Total: ₹5,099**

**Pharmacy Details**
- "Dispensed by: MedPlus Pharmacy, Andheri West, Mumbai"
- "Drug License No: MH/MUM/20-1234/2023"
- "All medications are sourced from authorised distributors and stored per manufacturer specifications."

**Delivery Tracker — Vertical stepper**
- ✅ Order confirmed — [date, time]
- ✅ Prescription verified by pharmacy — [date, time]
- ✅ Packed in temperature-controlled packaging — [date, time]
- ✅ Shipped via BlueDart — Tracking: BDXXXXXX — [date, time]
- 🔵 Out for delivery — Expected by [time] today
- ⬜ Delivered

**Estimated delivery**: "Today by 6:00 PM"
**Delivery address**: "Flat 402, Sai Krupa Apartments, Bandra West, Mumbai 400050"

---

#### 7. Navigation & Layout

**Top Navbar**
- Logo: "Laso" in teal, clean sans-serif
- Desktop links: How It Works, Programs, Consult, Dashboard, Support
- "Check Eligibility" CTA button
- Mobile: Hamburger menu with slide-out drawer

**Mobile-first responsive**: All pages designed for 375px first, then scaled up.

---

### State Management

**UserContext** stores:
- `quizCompleted: boolean`
- `quizData: { age, gender, height, weight, bmi, conditions, medications, program, hba1c, contraindications }`
- `selectedProgram: 'weight-loss' | 'diabetes' | 'both'`
- `booking: { doctor, date, time, zoomLink, confirmed }`
- `isLoggedIn: boolean`
- `userName: string`

**localStorage** persistence so refreshing doesn't lose state.

---

### Content Tone Rules (Applied Everywhere)
- No "revolutionary", "miracle", "guaranteed", "proven to work for everyone"
- Always attribute outcomes to clinical trials with context (sample size, duration)
- Side effects mentioned proactively, not buried
- "May", "typically", "on average", "in clinical trials" — hedging language used appropriately
- Doctor is the decision-maker, not the platform
- No before/after photos

