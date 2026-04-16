import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { weightLossPrescription, diabetesPrescription, bloodSugarData, hba1cData } from '@/data/medications';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';
import { Pill, Calendar, Video, ClipboardCheck, Bell, Activity } from 'lucide-react';

// New clinical components
import { useSimulation } from '@/hooks/useSimulation';
import { usePatientAnalytics } from '@/hooks/usePatientAnalytics';
import ClinicalInsightsCard from '@/components/dashboard/ClinicalInsightsCard';
import NextBestActionCard from '@/components/dashboard/NextBestActionCard';
import DoseOptimizationCard from '@/components/dashboard/DoseOptimizationCard';
import PlateauDetector from '@/components/dashboard/PlateauDetector';
import SideEffectTracker from '@/components/dashboard/SideEffectTracker';
import GLP1AdherenceScore from '@/components/dashboard/GLP1AdherenceScore';
import OutcomeComparisonChart from '@/components/dashboard/OutcomeComparisonChart';
import MetabolicHealthScore from '@/components/dashboard/MetabolicHealthScore';
import AppetiteSignalTracker from '@/components/dashboard/AppetiteSignalTracker';
import EscalationAlerts from '@/components/dashboard/EscalationAlerts';
import TimelineView from '@/components/dashboard/TimelineView';
import SimulationControls from '@/components/dashboard/SimulationControls';

export default function Dashboard() {
  const { isLoggedIn, userName, selectedProgram, setIsLoggedIn, setUserName } = useUser();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [viewMode, setViewMode] = useState<'weight-loss' | 'diabetes'>(selectedProgram === 'diabetes' ? 'diabetes' : 'weight-loss');

  const sim = useSimulation();
  const analytics = usePatientAnalytics(sim.data);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container flex min-h-[70vh] items-center justify-center py-12">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <CardTitle>Sign In to Dashboard</CardTitle>
              <p className="text-sm text-muted-foreground">Demo mode — enter any credentials to continue</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              <Button className="w-full" onClick={() => { setIsLoggedIn(true); setUserName(loginEmail.split('@')[0] || 'Arjun'); }}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const showWeightLoss = selectedProgram === 'both' ? viewMode === 'weight-loss' : selectedProgram === 'weight-loss';
  const showDiabetes = selectedProgram === 'both' ? viewMode === 'diabetes' : selectedProgram === 'diabetes';
  const prescription = showWeightLoss ? weightLossPrescription : diabetesPrescription;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        {/* Simulation Controls — always at top for demo */}
        <SimulationControls
          onSimulateWeek={sim.simulateWeek}
          onMissDoses={sim.simulateMissedDoses}
          onIncreaseSideEffects={sim.simulateSideEffects}
          onReset={sim.reset}
          onMarkDose={sim.markDose}
          log={sim.simulationLog}
        />

        {/* Welcome */}
        <div className="mt-6 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName}</h1>
            <Badge variant="secondary" className="mt-1">{selectedProgram === 'weight-loss' ? 'Weight Loss' : selectedProgram === 'diabetes' ? 'Diabetes Management' : 'Weight Loss & Diabetes'} Program</Badge>
          </div>
          <div className="flex gap-2">
            {selectedProgram === 'both' && (
              <div className="flex rounded-lg border border-border bg-card p-0.5">
                <button onClick={() => setViewMode('weight-loss')} className={`rounded-md px-3 py-1 text-xs font-medium ${viewMode === 'weight-loss' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Weight Loss</button>
                <button onClick={() => setViewMode('diabetes')} className={`rounded-md px-3 py-1 text-xs font-medium ${viewMode === 'diabetes' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Diabetes</button>
              </div>
            )}
          </div>
        </div>

        {/* Escalation Alerts — top priority */}
        <EscalationAlerts
          insights={analytics.insights}
          adherenceScore={analytics.adherenceScore}
          plateau={analytics.plateau}
          sideEffects={analytics.currentWeek.sideEffects}
        />

        {/* Row 1: Metabolic Score + Adherence + Dose */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <MetabolicHealthScore score={analytics.metabolicScore.score} previousScore={analytics.metabolicScore.previousScore} change={analytics.metabolicScore.change} />
          <GLP1AdherenceScore score={analytics.adherenceScore} dosesTaken={analytics.currentWeek.dosesTaken} dosesScheduled={analytics.currentWeek.dosesScheduled} />
          <DoseOptimizationCard recommendation={analytics.doseRecommendation} />
        </div>

        {/* Row 2: Clinical Insights + Next Best Actions */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ClinicalInsightsCard insights={analytics.insights} />
          <NextBestActionCard actions={analytics.nextActions} />
        </div>

        {/* Row 3: Charts — Expected vs Actual + Plateau */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <OutcomeComparisonChart data={sim.data} />
          <PlateauDetector plateau={analytics.plateau} />
        </div>

        {/* Row 4: Side Effects + Appetite */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SideEffectTracker currentEffects={analytics.currentWeek.sideEffects} onLogSymptom={sim.logSymptom} />
          <AppetiteSignalTracker current={analytics.currentWeek.appetite} history={analytics.allData.map(w => w.appetite)} onLog={sim.logAppetite} />
        </div>

        {/* Row 5: Prescription + Upcoming */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-base">Current Prescription</CardTitle>
                <p className="text-xs text-muted-foreground">As prescribed by {prescription.doctorName}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescription.medications.map((med, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{med.name}</h4>
                      <Badge>{med.currentDose}</Badge>
                    </div>
                    {med.targetDose !== med.currentDose && <p className="mt-1 text-xs text-muted-foreground">Target dose: {med.targetDose}</p>}
                    <p className="mt-2 text-sm text-muted-foreground">{med.schedule}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Started {med.startedWeeksAgo} weeks ago</span>
                      <span>Next escalation: {med.nextEscalation}</span>
                      <span>Refill: {med.nextRefill}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground italic">{prescription.note}</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Calendar className="h-4 w-4 text-primary" /> Upcoming</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <ActionCard icon={<Video className="h-4 w-4" />} title="Next consultation" sub="Dr. Sharma · April 28 · 4:30 PM" linkText="Join Zoom" />
                <ActionCard icon={<ClipboardCheck className="h-4 w-4" />} title="Weekly check-in due" sub="Log your weight and any symptoms" />
                <ActionCard icon={<Activity className="h-4 w-4" />} title="Blood work reminder" sub="Schedule fasting glucose test" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4 text-primary" /> Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>✅ Medication reminder sent — 8:45 AM today</p>
                <p>✅ Weekly check-in completed — 2 days ago</p>
                <p>✅ Consultation reminder call — completed yesterday</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Diabetes-specific charts */}
        {showDiabetes && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base"><Activity className="h-4 w-4 text-primary" /> Blood Sugar & HbA1c</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily">
                  <TabsList className="mb-4">
                    <TabsTrigger value="daily">Daily Glucose</TabsTrigger>
                    <TabsTrigger value="hba1c">HbA1c Trend</TabsTrigger>
                  </TabsList>
                  <TabsContent value="daily">
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={bloodSugarData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="day" tick={{ fontSize: 10 }} className="fill-muted-foreground" />
                        <YAxis domain={[100, 190]} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                        <Tooltip />
                        <ReferenceLine y={130} stroke="hsl(160, 84%, 39%)" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10 }} />
                        <Line type="monotone" dataKey="fasting" stroke="hsl(168, 80%, 32%)" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="hba1c">
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={hba1cData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="period" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                        <YAxis domain={[6, 9]} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                        <Tooltip />
                        <ReferenceLine y={7} stroke="hsl(160, 84%, 39%)" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10 }} />
                        <Bar dataKey="value" fill="hsl(168, 80%, 32%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="mt-2 text-xs text-muted-foreground">HbA1c reflects average blood sugar over 2–3 months.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Timeline */}
        <div className="mt-6">
          <TimelineView data={sim.data} />
        </div>

        <div className="mt-8 flex gap-3">
          <Button variant="outline" onClick={() => navigate('/support')}>Chat Support</Button>
          <Button variant="outline" onClick={() => navigate('/orders')}>Track Order</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ActionCard({ icon, title, sub, linkText }: { icon: React.ReactNode; title: string; sub: string; linkText?: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-start gap-2">
        <div className="mt-0.5 text-primary">{icon}</div>
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{sub}</p>
          {linkText && <a href="#" className="mt-1 inline-block text-xs text-primary hover:underline">{linkText}</a>}
        </div>
      </div>
    </div>
  );
}
