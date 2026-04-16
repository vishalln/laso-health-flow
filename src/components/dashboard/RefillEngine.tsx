import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, AlertTriangle } from 'lucide-react';
import { RefillStatus } from '@/data/clinicalArtifacts';

const statusConfig: Record<string, { color: string; badge: string; text: string }> = {
  sufficient: { color: 'border-border', badge: 'bg-success/10 text-success', text: 'Supply adequate' },
  low: { color: 'border-accent/30', badge: 'bg-accent/10 text-accent', text: 'Running low' },
  critical: { color: 'border-destructive/30', badge: 'bg-destructive/10 text-destructive', text: 'Reorder urgently' },
};

export default function RefillEngine({ refill }: { refill: RefillStatus }) {
  const config = statusConfig[refill.status];
  const barWidth = Math.min((refill.currentSupply / 30) * 100, 100);

  return (
    <Card className={`${config.color}`}>
      <CardContent className="py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Medication Supply</p>
          </div>
          <Badge variant="outline" className={`text-[10px] ${config.badge}`}>{config.text}</Badge>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{refill.medicationName}</span>
            <span className="font-medium text-foreground">{refill.currentSupply} days left</span>
          </div>
          <div className="mt-1.5 h-2 w-full rounded-full bg-muted">
            <div className={`h-2 rounded-full transition-all ${
              refill.status === 'critical' ? 'bg-destructive' : refill.status === 'low' ? 'bg-accent' : 'bg-success'
            }`} style={{ width: `${barWidth}%` }} />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Est. run out: {refill.estimatedRunOut}</span>
          <span>Auto-refill: {refill.autoRefillDate}</span>
        </div>

        {(refill.status === 'low' || refill.status === 'critical') && (
          <div className="mt-3 flex items-center gap-2">
            {refill.status === 'critical' && <AlertTriangle className="h-4 w-4 text-destructive" />}
            <Button size="sm" variant={refill.status === 'critical' ? 'destructive' : 'default'} className="w-full">
              Reorder Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
