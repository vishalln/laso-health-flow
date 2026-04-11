import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const programs = {
  'weight-loss': {
    title: 'Weight Loss Program',
    subtitle: 'Medically supervised weight management using GLP-1 receptor agonists',
    evidence: 'Clinical evidence: Patients on semaglutide lost an average of 14.9% of body weight over 68 weeks in the STEP 1 trial (N=1,961). Liraglutide (3.0mg) showed average weight loss of 8% of body weight over 56 weeks in the SCALE trial (N=3,731).',
    disclaimer: 'Treatment is prescribed only after physician evaluation and is not suitable for everyone.',
    includes: ['Doctor consultation', 'Prescription (if appropriate)', 'Monthly follow-ups', 'Dietary guidance', 'Progress monitoring'],
  },
  diabetes: {
    title: 'Diabetes Management Program',
    subtitle: 'Structured Type 2 diabetes management with evidence-based medications',
    evidence: 'Clinical evidence: Metformin monotherapy lowers HbA1c by approximately 1.12% on average (95% CI: 0.92–1.32%). GLP-1 receptor agonists can provide additional HbA1c reduction of 1.0–1.8% depending on baseline levels and specific agent used.',
    disclaimer: 'All treatment decisions are made by your physician based on your individual health profile.',
    includes: ['HbA1c monitoring', 'Medication management', 'Dietary planning', 'Complication screening', 'Monthly physician review'],
  },
};

export default function ProgramCards() {
  const [active, setActive] = useState<'weight-loss' | 'diabetes'>('weight-loss');
  const program = programs[active];

  return (
    <section id="programs" className="bg-muted/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Our Programs</h2>
          <p className="mt-4 text-muted-foreground">Choose the program that fits your health goals.</p>
        </div>

        {/* Toggle */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-center rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setActive('weight-loss')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${active === 'weight-loss' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Weight Loss
          </button>
          <button
            onClick={() => setActive('diabetes')}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${active === 'diabetes' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Diabetes Management
          </button>
        </div>

        <Card className="mx-auto mt-8 max-w-2xl animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">{program.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{program.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="rounded-lg bg-primary/5 p-4 text-sm leading-relaxed text-foreground">
              {program.evidence}
            </p>
            <p className="text-sm italic text-muted-foreground">{program.disclaimer}</p>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-foreground">What's included:</h4>
              <ul className="space-y-1.5">
                {program.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
