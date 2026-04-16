import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface Props {
  score: number;
  previousScore: number;
  change: number;
}

export default function MetabolicHealthScore({ score, previousScore, change }: Props) {
  const color = score >= 70 ? 'text-success' : score >= 45 ? 'text-accent' : 'text-destructive';
  const ringColor = score >= 70 ? 'stroke-success' : score >= 45 ? 'stroke-accent' : 'stroke-destructive';
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="h-4 w-4 text-primary" />
          Metabolic Health Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="relative h-28 w-28 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" className={ringColor} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={dashOffset} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${color}`}>{score}</span>
              <span className="text-[10px] text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)} pts
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Weight trend: 30%</p>
              <p>Adherence: 35%</p>
              <p>Glucose: 20%</p>
              <p>HbA1c: 15%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
