import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertOctagon } from 'lucide-react';
import { ClinicalInsight, PlateauStatus } from '@/hooks/usePatientAnalytics';
import { SideEffectEntry } from '@/data/patientJourney';

interface Props {
  insights: ClinicalInsight[];
  adherenceScore: number;
  plateau: PlateauStatus;
  sideEffects: SideEffectEntry[];
}

interface Alert {
  reason: string;
  severity: 'urgent' | 'review';
}

export default function EscalationAlerts({ insights, adherenceScore, plateau, sideEffects }: Props) {
  const alerts: Alert[] = [];

  if (sideEffects.some(e => e.severity >= 3)) {
    alerts.push({ reason: 'Severe side effects reported — dose may need to be held', severity: 'urgent' });
  }
  if (adherenceScore < 50) {
    alerts.push({ reason: `Adherence critically low (${adherenceScore}%) — treatment effectiveness compromised`, severity: 'urgent' });
  }
  if (plateau.isPlateaued && plateau.duration >= 4) {
    alerts.push({ reason: `Extended plateau (${plateau.duration} weeks) — dose or treatment review needed`, severity: 'review' });
  }
  if (adherenceScore < 70 && adherenceScore >= 50) {
    alerts.push({ reason: 'Adherence below target — patient engagement needed', severity: 'review' });
  }

  if (alerts.length === 0) return null;

  return (
    <Card className="border-destructive/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-destructive">
          <AlertOctagon className="h-4 w-4" />
          Doctor Review Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((a, i) => (
          <div key={i} className={`rounded-md p-2 text-xs ${a.severity === 'urgent' ? 'border border-destructive/20 bg-destructive/5 text-destructive font-medium' : 'border border-accent/20 bg-accent/5 text-accent'}`}>
            {a.severity === 'urgent' ? '🔴' : '🟡'} {a.reason}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
