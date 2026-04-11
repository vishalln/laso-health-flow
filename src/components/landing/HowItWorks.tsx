import { ClipboardList, Video, Pill, Truck, HeartPulse } from 'lucide-react';

const steps = [
  { icon: ClipboardList, title: 'Complete a health assessment', description: 'Answer questions about your health history, current medications, and goals. Takes about 3 minutes.' },
  { icon: Video, title: 'Consult with a licensed physician', description: 'A board-certified doctor reviews your profile and conducts a video consultation to evaluate your suitability for treatment.' },
  { icon: Pill, title: 'Receive your personalised prescription', description: 'If clinically appropriate, your doctor prescribes FDA/CDSCO-approved medication tailored to your condition.' },
  { icon: Truck, title: 'Medication delivered to your home', description: 'Your prescription is fulfilled by a licensed pharmacy and shipped in discreet, temperature-controlled packaging.' },
  { icon: HeartPulse, title: 'Ongoing medical supervision', description: 'Monthly follow-ups with your doctor, progress tracking, and dedicated support throughout your treatment.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="mt-4 text-muted-foreground">
            From your first assessment to ongoing care — a clear, physician-guided process.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-5">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="mt-3 text-xs font-semibold text-primary">Step {i + 1}</span>
              <h3 className="mt-2 text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-7 hidden h-px w-8 bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
