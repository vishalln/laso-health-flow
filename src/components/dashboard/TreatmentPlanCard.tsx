import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { TreatmentPlan } from '@/data/clinicalArtifacts';

const statusIcon: Record<string, React.ReactNode> = {
  'on-track': <Clock className="h-3.5 w-3.5 text-primary" />,
  behind: <AlertTriangle className="h-3.5 w-3.5 text-accent" />,
  achieved: <CheckCircle2 className="h-3.5 w-3.5 text-success" />,
};

const statusBadge: Record<string, string> = {
  'on-track': 'bg-primary/10 text-primary',
  behind: 'bg-accent/10 text-accent',
  achieved: 'bg-success/10 text-success',
};

export default function TreatmentPlanCard({ plan }: { plan: TreatmentPlan }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Treatment Plan
          </CardTitle>
          <span className="text-[10px] text-muted-foreground">Updated {plan.updatedDate}</span>
        </div>
        <p className="text-xs text-muted-foreground">Prescribed by {plan.doctorName}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Diagnosis */}
        <div>
          <p className="text-xs font-semibold text-foreground">Diagnosis</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {plan.diagnosis.map((d, i) => (
              <Badge key={i} variant="outline" className="text-[10px]">{d}</Badge>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div>
          <p className="text-xs font-semibold text-foreground">Treatment Goals</p>
          <div className="mt-2 space-y-2">
            {plan.goals.map((g, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border p-2.5">
                {statusIcon[g.status]}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-foreground">{g.target}</p>
                    <Badge variant="outline" className={`text-[9px] ${statusBadge[g.status]}`}>{g.status}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{g.metric} · {g.timeframe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div>
          <p className="text-xs font-semibold text-foreground">Medications</p>
          {plan.medications.map((m, i) => (
            <div key={i} className="mt-2 rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-medium text-foreground">{m.name} — {m.dose}</p>
              <p className="text-[11px] text-muted-foreground">{m.frequency}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Titration: {m.titrationPlan}</p>
            </div>
          ))}
        </div>

        {/* Lifestyle */}
        <div>
          <p className="text-xs font-semibold text-foreground">Lifestyle Recommendations</p>
          <ul className="mt-1 space-y-0.5">
            {plan.lifestyle.map((l, i) => (
              <li key={i} className="text-[11px] text-muted-foreground">• {l}</li>
            ))}
          </ul>
        </div>

        {/* Monitoring */}
        <div>
          <p className="text-xs font-semibold text-foreground">Monitoring Schedule</p>
          <ul className="mt-1 space-y-0.5">
            {plan.monitoring.map((m, i) => (
              <li key={i} className="text-[11px] text-muted-foreground">• {m}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-primary/5 p-2.5">
          <p className="text-[11px] text-primary">📅 {plan.followUpSchedule}</p>
        </div>
      </CardContent>
    </Card>
  );
}
