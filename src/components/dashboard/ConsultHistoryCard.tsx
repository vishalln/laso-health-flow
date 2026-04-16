import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, Video } from 'lucide-react';
import { ConsultRecord } from '@/data/clinicalArtifacts';

const typeBadge: Record<string, string> = {
  initial: 'bg-primary/10 text-primary',
  'follow-up': 'bg-muted text-muted-foreground',
  urgent: 'bg-destructive/10 text-destructive',
};

export default function ConsultHistoryCard({ records }: { records: ConsultRecord[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="h-4 w-4 text-primary" />
          Consultation History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {[...records].reverse().map((r, i) => (
            <div key={r.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-3.5 w-3.5 text-primary" />
                </div>
                {i < records.length - 1 && <div className="my-1 h-full w-px bg-border" />}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{r.date}</p>
                  <Badge variant="outline" className={`text-[9px] ${typeBadge[r.type]}`}>
                    {r.type === 'initial' ? 'Initial' : r.type === 'follow-up' ? 'Follow-up' : 'Urgent'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{r.doctorName} · {r.duration}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.summary}</p>
                {r.keyDecisions.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {r.keyDecisions.map((d, j) => (
                      <span key={j} className="inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{d}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
