import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { ClipboardCheck, Check, Scale, Thermometer, Utensils } from 'lucide-react';

interface DailyCheckInProps {
  onLogWeight: (weight: number) => void;
  onLogSymptom: (symptom: 'nausea' | 'vomiting' | 'constipation' | 'fatigue', severity: 1 | 2 | 3) => void;
  onLogAppetite: (hunger: number, cravings: number, mealSize: number) => void;
  onMarkDose: (taken: boolean) => void;
  currentWeight: number;
  lastCheckIn?: string;
}

export default function DailyCheckIn({ onLogWeight, onLogSymptom, onLogAppetite, onMarkDose, currentWeight, lastCheckIn }: DailyCheckInProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState(currentWeight.toString());
  const [doseTaken, setDoseTaken] = useState<boolean | null>(null);
  const [hunger, setHunger] = useState(3);
  const [cravings, setCravings] = useState(3);
  const [mealSize, setMealSize] = useState(3);
  const [symptoms, setSymptoms] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (weight) onLogWeight(parseFloat(weight));
    if (doseTaken !== null) onMarkDose(doseTaken);
    onLogAppetite(hunger, cravings, mealSize);
    Object.entries(symptoms).forEach(([sym, sev]) => {
      onLogSymptom(sym as 'nausea' | 'vomiting' | 'constipation' | 'fatigue', sev as 1 | 2 | 3);
    });
    setSubmitted(true);
    setTimeout(() => { setOpen(false); setSubmitted(false); setStep(1); }, 1500);
  };

  const hungerLabels = ['Very low', 'Low', 'Moderate', 'High', 'Very high'];
  const severityLabels = ['Mild', 'Moderate', 'Severe'];

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setStep(1); setSubmitted(false); } }}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer border-primary/20 transition-all hover:border-primary/40 hover:shadow-md">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Daily Check-In</p>
              <p className="text-xs text-muted-foreground">
                {lastCheckIn ? `Last: ${lastCheckIn}` : 'Log your weight, dose, and symptoms'}
              </p>
            </div>
            <Badge variant="outline" className="bg-primary/5 text-primary">Log Now</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            Daily Check-In
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
              <Check className="h-7 w-7 text-success" />
            </div>
            <p className="font-semibold text-foreground">Check-in recorded</p>
            <p className="text-sm text-muted-foreground">Your doctor will review at your next consultation.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Step indicators */}
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Scale className="h-4 w-4 text-primary" /> Weight
                </div>
                <div>
                  <Label htmlFor="checkin-weight">Morning fasting weight (kg)</Label>
                  <Input id="checkin-weight" type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1" />
                  <p className="mt-1 text-xs text-muted-foreground">Weigh yourself each morning before eating, in light clothing.</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  💊 Medication
                </div>
                <p className="text-sm text-muted-foreground">Did you take your Semaglutide today?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setDoseTaken(true)}
                    className={`rounded-lg border p-3 text-sm font-medium transition-colors ${doseTaken === true ? 'border-success bg-success/10 text-success' : 'border-border text-muted-foreground hover:border-success/50'}`}>
                    ✅ Yes, taken
                  </button>
                  <button onClick={() => setDoseTaken(false)}
                    className={`rounded-lg border p-3 text-sm font-medium transition-colors ${doseTaken === false ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border text-muted-foreground hover:border-destructive/50'}`}>
                    ❌ Missed
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Utensils className="h-4 w-4 text-primary" /> Appetite
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Hunger level</Label>
                      <span className="text-xs text-muted-foreground">{hungerLabels[hunger - 1]}</span>
                    </div>
                    <Slider value={[hunger]} onValueChange={([v]) => setHunger(v)} min={1} max={5} step={1} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Cravings</Label>
                      <span className="text-xs text-muted-foreground">{hungerLabels[cravings - 1]}</span>
                    </div>
                    <Slider value={[cravings]} onValueChange={([v]) => setCravings(v)} min={1} max={5} step={1} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Meal size</Label>
                      <span className="text-xs text-muted-foreground">{hungerLabels[mealSize - 1]}</span>
                    </div>
                    <Slider value={[mealSize]} onValueChange={([v]) => setMealSize(v)} min={1} max={5} step={1} className="mt-2" />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Thermometer className="h-4 w-4 text-primary" /> Symptoms
                </div>
                <p className="text-xs text-muted-foreground">Tap any symptoms you experienced today:</p>
                {(['nausea', 'vomiting', 'constipation', 'fatigue'] as const).map(sym => (
                  <div key={sym} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize text-foreground">{sym}</span>
                      {symptoms[sym] ? (
                        <button onClick={() => { const s = { ...symptoms }; delete s[sym]; setSymptoms(s); }}
                          className="text-xs text-destructive hover:underline">Remove</button>
                      ) : null}
                    </div>
                    <div className="mt-2 flex gap-2">
                      {[1, 2, 3].map(sev => (
                        <button key={sev} onClick={() => setSymptoms(prev => ({ ...prev, [sym]: sev }))}
                          className={`rounded-md border px-3 py-1 text-xs font-medium transition-colors ${symptoms[sym] === sev
                            ? sev === 1 ? 'border-accent bg-accent/10 text-accent'
                              : sev === 2 ? 'border-accent bg-accent/10 text-accent'
                                : 'border-destructive bg-destructive/10 text-destructive'
                            : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                          {severityLabels[sev - 1]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              {step > 1 ? (
                <Button variant="outline" size="sm" onClick={() => setStep(s => s - 1)}>Back</Button>
              ) : <div />}
              {step < 4 ? (
                <Button size="sm" onClick={() => setStep(s => s + 1)}>Next</Button>
              ) : (
                <Button size="sm" onClick={handleSubmit}>Submit Check-In</Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
