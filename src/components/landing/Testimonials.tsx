import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/data/testimonials';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Patient Experiences</h2>
          <p className="mt-4 text-muted-foreground">
            Real accounts from patients in our programs.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 5).map((t) => (
            <Card key={t.name} className="relative">
              <CardContent className="pt-6">
                <Quote className="mb-3 h-5 w-5 text-primary/30" />
                <p className="text-sm leading-relaxed text-foreground">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}, {t.age}</p>
                    <p className="text-xs text-muted-foreground">{t.city} · {t.program === 'weight-loss' ? 'Weight Loss' : 'Diabetes'} Program</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          Individual results vary based on adherence, baseline health, and clinical factors. These accounts reflect personal experiences and should not be interpreted as guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}
