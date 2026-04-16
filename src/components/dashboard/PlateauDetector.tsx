import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, AlertTriangle } from 'lucide-react';
import { PlateauStatus } from '@/hooks/usePatientAnalytics';

export default function PlateauDetector({ plateau }: { plateau: PlateauStatus }) {
  if (!plateau.isPlateaued) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingDown className="h-4 w-4 text-success" />
            No Plateau Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Weight is trending downward at {plateau.avgWeeklyLoss.toFixed(2)} kg/week average. This is within expected range.
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="border-accent/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-accent">
          <AlertTriangle className="h-4 w-4" />
          Weight Plateau Detected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{plateau.duration}</p>
            <p className="text-xs text-muted-foreground">weeks stalled</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{plateau.avgWeeklyLoss.toFixed(2)} kg</p>
            <p className="text-xs text-muted-foreground">avg. weekly loss</p>
          </div>
        </div>
        <div className="rounded-md bg-muted p-2 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">What this means:</p>
          <p className="mt-1">Plateaus are common during GLP-1 therapy, typically around weeks 6-8. They do not mean the medication has stopped working. Discuss with your doctor — dose adjustment, dietary changes, or additional physical activity may help.</p>
        </div>
      </CardContent>
    </Card>
  );
}
