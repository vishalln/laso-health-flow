import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, ArrowRight } from 'lucide-react';
import { NextAction } from '@/hooks/usePatientAnalytics';

const priorityStyle: Record<string, string> = {
  safety: 'border-destructive/30 bg-destructive/5',
  adherence: 'border-accent/30 bg-accent/5',
  optimization: 'border-primary/30 bg-primary/5',
};

const priorityBadge: Record<string, string> = {
  safety: 'bg-destructive/15 text-destructive',
  adherence: 'bg-accent/15 text-accent',
  optimization: 'bg-primary/15 text-primary',
};

export default function NextBestActionCard({ actions }: { actions: NextAction[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="h-4 w-4 text-primary" />
          What To Do Next
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map(a => (
          <div key={a.id} className={`rounded-lg border p-3 ${priorityStyle[a.priority]}`}>
            <div className="flex items-start gap-2">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{a.action}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.reason}</p>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <Badge variant="outline" className={`text-[10px] ${priorityBadge[a.priority]}`}>
                {a.priority}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
