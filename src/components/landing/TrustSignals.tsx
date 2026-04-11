import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Building2, HeartPulse } from 'lucide-react';

const signals = [
  {
    icon: ShieldCheck,
    title: 'Licensed Physicians',
    description: 'All consultations conducted by doctors registered with the Medical Council of India (MCI). Minimum 5 years clinical experience in endocrinology or internal medicine.',
  },
  {
    icon: Building2,
    title: 'Verified Pharmacy Partners',
    description: 'Medications dispensed by pharmacies licensed under the Drugs and Cosmetics Act, 1940. All drugs are Schedule H compliant and sourced from verified manufacturers.',
  },
  {
    icon: HeartPulse,
    title: 'Continuous Medical Oversight',
    description: 'Your doctor monitors your progress monthly. Treatment is adjusted or discontinued based on clinical response and tolerability.',
  },
];

export default function TrustSignals() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Why Trust Laso</h2>
          <p className="mt-4 text-muted-foreground">
            Every aspect of your care is backed by clinical standards and regulatory compliance.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {signals.map((s) => (
            <Card key={s.title} className="border-primary/10">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
