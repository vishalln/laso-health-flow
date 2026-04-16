import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GitCompare } from 'lucide-react';
import { WeeklySnapshot } from '@/data/patientJourney';
import { expectedWeightCurve } from '@/data/patientJourney';

interface Props {
  data: WeeklySnapshot[];
}

export default function OutcomeComparisonChart({ data }: Props) {
  const chartData = data.map(w => {
    const expected = expectedWeightCurve.find(e => e.week === w.week);
    return { week: `Wk ${w.week}`, actual: w.weight, expected: expected?.expected ?? null };
  });

  const latest = data[data.length - 1];
  const expectedLatest = expectedWeightCurve.find(e => e.week === latest.week);
  const diff = expectedLatest ? latest.weight - expectedLatest.expected : 0;
  const status = diff <= -0.5 ? 'Above expected' : diff >= 1.5 ? 'Below expected' : 'On track';
  const statusColor = status === 'On track' ? 'bg-success/15 text-success' : status === 'Above expected' ? 'bg-success/15 text-success' : 'bg-accent/15 text-accent';

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompare className="h-4 w-4 text-primary" />
            Expected vs Actual
          </CardTitle>
          <Badge className={statusColor}>{status}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Compared against STEP trial average outcomes</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="week" tick={{ fontSize: 10 }} className="fill-muted-foreground" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" name="Your weight" stroke="hsl(168, 80%, 32%)" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="expected" name="STEP trial avg" stroke="hsl(215, 20%, 65%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
        {diff > 1.5 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Your weight is {diff.toFixed(1)} kg above expected. This may be due to adherence patterns, dietary factors, or individual metabolic variation. Your doctor can assess at your next consultation.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
