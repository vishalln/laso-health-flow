import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pill } from 'lucide-react';
import { DoseRecommendation } from '@/hooks/usePatientAnalytics';

const statusConfig = {
  continue: { label: 'Continue', color: 'bg-success/15 text-success' },
  escalate: { label: 'Consider Escalation', color: 'bg-accent/15 text-accent' },
  hold: { label: 'Hold Dose', color: 'bg-destructive/15 text-destructive' },
};

export default function DoseOptimizationCard({ recommendation }: { recommendation: DoseRecommendation }) {
  const config = statusConfig[recommendation.status];
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Pill className="h-4 w-4 text-primary" />
          Dose Optimization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Badge className={config.color}>{config.label}</Badge>
          <span className="text-xs text-muted-foreground">
            {recommendation.currentDose}mg · {recommendation.weeksOnDose} weeks on dose
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{recommendation.reason}</p>
        <div className="mt-3 rounded-md border border-destructive/20 bg-destructive/5 p-2">
          <p className="text-xs font-medium text-destructive">⚕️ Doctor review required — do not self-adjust dosage</p>
        </div>
      </CardContent>
    </Card>
  );
}
