import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';
import { DoctorNote } from '@/data/clinicalArtifacts';

const typeLabel: Record<string, string> = {
  initial: 'Initial Consult',
  'follow-up': 'Follow-Up',
  urgent: 'Urgent',
};

const typeBadge: Record<string, string> = {
  initial: 'bg-primary/10 text-primary',
  'follow-up': 'bg-muted text-muted-foreground',
  urgent: 'bg-destructive/10 text-destructive',
};

export default function DoctorNotesCard({ notes }: { notes: DoctorNote[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(notes[notes.length - 1]?.id ?? null);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Stethoscope className="h-4 w-4 text-primary" />
          Doctor's Notes
        </CardTitle>
        <p className="text-xs text-muted-foreground">Clinical decisions and reasoning from your consultations</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {[...notes].reverse().map(note => {
          const expanded = expandedId === note.id;
          return (
            <div key={note.id} className="rounded-lg border border-border">
              <button onClick={() => setExpandedId(expanded ? null : note.id)}
                className="flex w-full items-center justify-between p-3 text-left">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{note.date}</p>
                      <Badge variant="outline" className={`text-[10px] ${typeBadge[note.consultType]}`}>
                        {typeLabel[note.consultType]}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{note.doctorName}</p>
                  </div>
                </div>
                {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>

              {expanded && (
                <div className="border-t border-border px-3 pb-3 pt-2 text-sm">
                  <p className="text-muted-foreground">{note.summary}</p>

                  <div className="mt-3">
                    <p className="text-xs font-semibold text-foreground">Clinical Findings</p>
                    <ul className="mt-1 space-y-0.5">
                      {note.findings.map((f, i) => (
                        <li key={i} className="text-xs text-muted-foreground">• {f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold text-foreground">Decisions</p>
                    <ul className="mt-1 space-y-0.5">
                      {note.decisions.map((d, i) => (
                        <li key={i} className="text-xs text-muted-foreground">• {d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold text-foreground">Next Steps</p>
                    <ul className="mt-1 space-y-0.5">
                      {note.nextSteps.map((n, i) => (
                        <li key={i} className="text-xs text-muted-foreground">• {n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
