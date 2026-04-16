import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  score: number;
  dosesTaken: number;
  dosesScheduled: number;
}

export default function GLP1AdherenceScore({ score, dosesTaken, dosesScheduled }: Props) {
  const category = score >= 85 ? 'Good' : score >= 60 ? 'Moderate' : 'Poor';
  const color = score >= 85 ? 'text-success' : score >= 60 ? 'text-accent' : 'text-destructive';
  const progressColor = score >= 85 ? '[&>div]:bg-success' : score >= 60 ? '[&>div]:bg-accent' : '[&>div]:bg-destructive';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          Adherence Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-end gap-2">
          <span className={`text-4xl font-bold ${color}`}>{score}%</span>
          <span className={`mb-1 text-sm font-medium ${color}`}>{category}</span>
        </div>
        <Progress value={score} className={`h-2 ${progressColor}`} />
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-md bg-muted p-2">
            <p className="font-bold text-foreground">{dosesTaken}/{dosesScheduled}</p>
            <p className="text-muted-foreground">This week</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="font-bold text-foreground">{score >= 85 ? '0' : score >= 60 ? '1-2' : '3+'}</p>
            <p className="text-muted-foreground">Missed streaks</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="font-bold text-foreground">{score >= 80 ? 'On time' : 'Variable'}</p>
            <p className="text-muted-foreground">Timing</p>
          </div>
        </div>
        {score < 85 && (
          <p className="text-xs text-muted-foreground">GLP-1 receptor agonists require consistent daily dosing for optimal therapeutic effect. Set a daily alarm for 30 minutes before your first meal.</p>
        )}
      </CardContent>
    </Card>
  );
}
