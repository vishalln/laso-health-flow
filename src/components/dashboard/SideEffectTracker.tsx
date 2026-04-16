import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Thermometer } from 'lucide-react';
import { SideEffectEntry } from '@/data/patientJourney';

const symptoms = ['nausea', 'vomiting', 'constipation', 'fatigue'] as const;
const severityLabel = { 1: 'Mild', 2: 'Moderate', 3: 'Severe' };
const severityColor = { 1: 'bg-success/15 text-success', 2: 'bg-accent/15 text-accent', 3: 'bg-destructive/15 text-destructive' };

interface Props {
  currentEffects: SideEffectEntry[];
  onLogSymptom: (symptom: 'nausea' | 'vomiting' | 'constipation' | 'fatigue', severity: 1 | 2 | 3) => void;
}

export default function SideEffectTracker({ currentEffects, onLogSymptom }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [sel, setSel] = useState<{ symptom: typeof symptoms[number]; severity: 1 | 2 | 3 }>({ symptom: 'nausea', severity: 1 });

  const hasSevere = currentEffects.some(e => e.severity >= 3);
  const hasPersistent = currentEffects.some(e => e.severity >= 2);

  return (
    <Card className={hasSevere ? 'border-destructive/30' : ''}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Thermometer className="h-4 w-4 text-primary" />
          Side Effects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {currentEffects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No side effects reported this week.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {currentEffects.map(e => (
              <Badge key={e.symptom} className={severityColor[e.severity]}>
                {e.symptom} — {severityLabel[e.severity]}
              </Badge>
            ))}
          </div>
        )}
        {hasSevere && (
          <div className="rounded-md border border-destructive/20 bg-destructive/5 p-2">
            <p className="text-xs font-medium text-destructive">Severe symptoms detected. Contact your doctor or hold your dose until reviewed.</p>
          </div>
        )}
        {hasPersistent && !hasSevere && (
          <div className="rounded-md border border-accent/20 bg-accent/5 p-2">
            <p className="text-xs text-accent">Moderate symptoms present. If persistent beyond 2-4 weeks, discuss with your doctor.</p>
          </div>
        )}
        {!hasSevere && !hasPersistent && currentEffects.length > 0 && (
          <p className="text-xs text-muted-foreground">Mild symptoms are common in early weeks of GLP-1 therapy and typically resolve within 2-4 weeks.</p>
        )}

        {showForm ? (
          <div className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex flex-wrap gap-1">
              {symptoms.map(s => (
                <Button key={s} size="sm" variant={sel.symptom === s ? 'default' : 'outline'} className="text-xs" onClick={() => setSel(p => ({ ...p, symptom: s }))}>{s}</Button>
              ))}
            </div>
            <div className="flex gap-1">
              {([1, 2, 3] as const).map(sev => (
                <Button key={sev} size="sm" variant={sel.severity === sev ? 'default' : 'outline'} className="text-xs" onClick={() => setSel(p => ({ ...p, severity: sev }))}>{severityLabel[sev]}</Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => { onLogSymptom(sel.symptom, sel.severity); setShowForm(false); }}>Log</Button>
              <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setShowForm(true)}>Log Symptom</Button>
        )}
      </CardContent>
    </Card>
  );
}
