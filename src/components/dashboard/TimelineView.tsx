import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';
import { WeeklySnapshot, TimelineEvent } from '@/data/patientJourney';

const typeIcon: Record<TimelineEvent['type'], string> = {
  medication_change: '💊',
  consultation: '🩺',
  symptom: '⚠️',
  milestone: '🎯',
  alert: '🔔',
  log: '📝',
};

const typeColor: Record<TimelineEvent['type'], string> = {
  medication_change: 'border-primary/40',
  consultation: 'border-primary/40',
  symptom: 'border-accent/40',
  milestone: 'border-success/40',
  alert: 'border-destructive/40',
  log: 'border-border',
};

interface Props {
  data: WeeklySnapshot[];
}

export default function TimelineView({ data }: Props) {
  const allEvents = data.flatMap(w =>
    w.events.map(e => ({ ...e, week: w.week, weight: w.weight }))
  ).reverse();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-primary" />
          Treatment Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-3">
          <div className="relative space-y-0 pl-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
            {allEvents.map((event, i) => (
              <div key={i} className="relative pb-4">
                <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-card text-xs">
                  {typeIcon[event.type]}
                </div>
                <div className={`rounded-lg border p-3 ${typeColor[event.type]}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <span className="text-[10px] text-muted-foreground">Wk {event.week} · {event.weight} kg</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
