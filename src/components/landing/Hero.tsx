import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Stethoscope } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background py-20 md:py-32">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Stethoscope className="h-4 w-4" />
            Doctor-led healthcare platform
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Doctor-led weight loss &amp; diabetes care that actually works
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Clinically supervised. Evidence-based medications. Delivered to your door.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/quiz">
              <Button size="lg" className="gap-2 px-8 text-base">
                Check Your Eligibility
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="text-base">
                Learn How It Works
              </Button>
            </a>
          </div>
        </div>
      </div>
      {/* Decorative blobs */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}
