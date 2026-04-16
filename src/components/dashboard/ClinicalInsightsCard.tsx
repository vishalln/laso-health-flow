import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';
import { ClinicalInsight } from '@/hooks/usePatientAnalytics';

const severityColor: Record<string, string> = {
  green: 'bg-success/10 text-success border-success/20',
  amber: 'bg-accent/10 text-accent border-accent/20',
  red: 'bg-destructive/10 text-destructive border-destructive/20',
};

const severityBadge: Record<string, string> = {
  green: 'bg-success/15 text-success hover:bg-success/20',
  amber: 'bg-accent/15 text-accent hover:bg-accent/20',
  red: 'bg-destructive/15 text-destructive hover:bg-destructive/20',
};

const categoryLabel: Record<string, string> = {
  trend: 'Trend', behavioral: 'Behavioral', treatment: 'Treatment',
};

export default function ClinicalInsightsCard({ insights }: { insights: ClinicalInsight[] }) {
  if (insights.length === 0) return null;
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="h-4 w-4 text-primary" />
          Clinical Insights
        </CardTitle>
        <p className="text-xs text-muted-foreground">Auto-generated from your health data</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map(insight => (
          <div key={insight.id} className={`rounded-lg border p-3 ${severityColor[insight.severity]}`}>
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold">{insight.title}</h4>
              <Badge variant="outline" className={`text-[10px] ${severityBadge[insight.severity]}`}>
                {categoryLabel[insight.category]}
              </Badge>
            </div>
            <p className="mt-1 text-xs opacity-80">{insight.explanation}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
