import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Utensils } from 'lucide-react';
import { AppetiteEntry } from '@/data/patientJourney';

const labels5 = ['Very low', 'Low', 'Moderate', 'High', 'Very high'];

interface Props {
  current: AppetiteEntry;
  history: AppetiteEntry[];
  onLog: (hunger: number, cravings: number, mealSize: number) => void;
}

export default function AppetiteSignalTracker({ current, history, onLog }: Props) {
  const [editing, setEditing] = useState(false);
  const [hunger, setHunger] = useState(current.hungerLevel);
  const [cravings, setCravings] = useState(current.cravings);
  const [mealSize, setMealSize] = useState(current.mealSize);

  // Detect tolerance: appetite trending up over recent history
  const recentTrend = history.length >= 3
    ? history[history.length - 1].hungerLevel - history[history.length - 3].hungerLevel
    : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Utensils className="h-4 w-4 text-primary" />
          Appetite Signals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-md bg-muted p-2">
            <p className="text-lg font-bold text-foreground">{current.hungerLevel}/5</p>
            <p className="text-muted-foreground">Hunger</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-lg font-bold text-foreground">{current.cravings}/5</p>
            <p className="text-muted-foreground">Cravings</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-lg font-bold text-foreground">{current.mealSize}/5</p>
            <p className="text-muted-foreground">Meal size</p>
          </div>
        </div>

        {recentTrend >= 2 && (
          <div className="rounded-md border border-accent/20 bg-accent/5 p-2">
            <p className="text-xs text-accent">Appetite suppression may be weakening. This can indicate developing tolerance — worth discussing at your next consultation.</p>
          </div>
        )}

        {editing ? (
          <div className="space-y-3 rounded-lg border border-border p-3">
            <div>
              <p className="mb-1 text-xs font-medium text-foreground">Hunger: {labels5[hunger - 1]}</p>
              <Slider value={[hunger]} min={1} max={5} step={1} onValueChange={([v]) => setHunger(v)} />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-foreground">Cravings: {labels5[cravings - 1]}</p>
              <Slider value={[cravings]} min={1} max={5} step={1} onValueChange={([v]) => setCravings(v)} />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-foreground">Meal size: {labels5[mealSize - 1]}</p>
              <Slider value={[mealSize]} min={1} max={5} step={1} onValueChange={([v]) => setMealSize(v)} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => { onLog(hunger, cravings, mealSize); setEditing(false); }}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Log Appetite</Button>
        )}
      </CardContent>
    </Card>
  );
}
