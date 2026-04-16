import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, RotateCcw } from 'lucide-react';

interface Props {
  onSimulateWeek: () => void;
  onMissDoses: () => void;
  onIncreaseSideEffects: () => void;
  onReset: () => void;
  onMarkDose: (taken: boolean) => void;
  log: string[];
}

export default function SimulationControls({ onSimulateWeek, onMissDoses, onIncreaseSideEffects, onReset, onMarkDose, log }: Props) {
  return (
    <Card className="border-dashed border-primary/30 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FlaskConical className="h-4 w-4 text-primary" />
          Simulation Controls
          <Badge variant="outline" className="ml-auto text-[10px]">Demo Mode</Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">Interact with mock data to see how the system responds</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={onSimulateWeek}>Simulate 1 Week</Button>
          <Button size="sm" variant="outline" onClick={onMissDoses}>Miss Doses</Button>
          <Button size="sm" variant="outline" onClick={onIncreaseSideEffects}>Increase Side Effects</Button>
          <Button size="sm" variant="outline" onClick={() => onMarkDose(true)}>Mark Dose Taken</Button>
          <Button size="sm" variant="outline" onClick={() => onMarkDose(false)}>Mark Dose Missed</Button>
          <Button size="sm" variant="ghost" onClick={onReset} className="text-muted-foreground">
            <RotateCcw className="mr-1 h-3 w-3" /> Reset
          </Button>
        </div>
        {log.length > 0 && (
          <div className="max-h-24 overflow-y-auto rounded-md bg-card p-2">
            {log.slice(-5).map((entry, i) => (
              <p key={i} className="text-[11px] text-muted-foreground">→ {entry}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
