import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, Minus, BarChart3 } from 'lucide-react';
import { WeeklySnapshot } from '@/data/patientJourney';

interface WeeklyReviewProps {
  currentWeek: WeeklySnapshot;
  previousWeek: WeeklySnapshot;
  totalLoss: number;
  totalLossPct: number;
  adherenceScore: number;
}

export default function WeeklyReview({ currentWeek, previousWeek, totalLoss, totalLossPct, adherenceScore }: WeeklyReviewProps) {
  const weightDiff = currentWeek.weight - previousWeek.weight;
  const glucoseDiff = currentWeek.fastingGlucose - previousWeek.fastingGlucose;
  const adherencePct = Math.round((currentWeek.dosesTaken / currentWeek.dosesScheduled) * 100);

  const WeightIcon = weightDiff < -0.3 ? TrendingDown : weightDiff > 0.3 ? TrendingUp : Minus;
  const weightColor = weightDiff <= 0 ? 'text-success' : 'text-destructive';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-4 w-4 text-primary" />
            Week {currentWeek.week} Summary
          </CardTitle>
          <Badge variant="outline" className="text-xs">This Week</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* Weight */}
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground">Weight</p>
            <p className="mt-1 text-lg font-bold text-foreground">{currentWeek.weight} kg</p>
            <div className={`mt-1 flex items-center justify-center gap-1 text-xs ${weightColor}`}>
              <WeightIcon className="h-3 w-3" />
              {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)} kg
            </div>
          </div>

          {/* Total Loss */}
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Lost</p>
            <p className="mt-1 text-lg font-bold text-success">{totalLoss.toFixed(1)} kg</p>
            <p className="mt-1 text-xs text-muted-foreground">{totalLossPct.toFixed(1)}% of starting</p>
          </div>

          {/* Glucose */}
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground">Fasting Glucose</p>
            <p className="mt-1 text-lg font-bold text-foreground">{currentWeek.fastingGlucose} mg/dL</p>
            <p className={`mt-1 text-xs ${glucoseDiff <= 0 ? 'text-success' : 'text-destructive'}`}>
              {glucoseDiff > 0 ? '+' : ''}{glucoseDiff} mg/dL
            </p>
          </div>

          {/* Adherence */}
          <div className="rounded-lg border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground">This Week</p>
            <p className="mt-1 text-lg font-bold text-foreground">{currentWeek.dosesTaken}/{currentWeek.dosesScheduled}</p>
            <p className={`mt-1 text-xs ${adherencePct >= 85 ? 'text-success' : adherencePct >= 60 ? 'text-accent' : 'text-destructive'}`}>
              {adherencePct}% doses taken
            </p>
          </div>
        </div>

        {/* Key observations */}
        <div className="mt-4 rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium text-foreground">Key observations this week:</p>
          <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
            {weightDiff < -0.5 && <li>• Good weight loss momentum — continue current plan</li>}
            {weightDiff >= -0.3 && weightDiff <= 0.3 && <li>• Weight relatively stable — monitor for emerging plateau</li>}
            {weightDiff > 0.3 && <li>• Weight increased — may be normal fluctuation or dietary factor</li>}
            {currentWeek.sideEffects.length === 0 && <li>• No side effects reported — good tolerability</li>}
            {currentWeek.sideEffects.length > 0 && <li>• {currentWeek.sideEffects.length} symptom(s) logged — being monitored</li>}
            {adherencePct < 85 && <li>• Adherence below 85% — consistent dosing improves outcomes</li>}
            {currentWeek.appetite.hungerLevel >= 4 && <li>• Hunger levels elevated — appetite suppression may be weakening</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
