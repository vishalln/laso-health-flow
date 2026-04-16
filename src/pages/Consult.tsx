import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { doctors, Doctor } from '@/data/doctors';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, Video, CheckCircle2, Mail, Phone, Clock, Calendar, ArrowRight, FileText, AlertTriangle } from 'lucide-react';
import { format, addDays } from 'date-fns';

const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'];
const bookedSlots: Record<string, string[]> = {
  0: ['11:30 AM'],
  1: ['2:00 PM', '6:00 PM'],
  2: [],
  3: ['10:00 AM'],
  4: ['4:30 PM'],
  5: ['11:30 AM', '2:00 PM'],
  6: [],
};

export default function Consult() {
  const { setBooking, quizData } = useUser();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [reminderDone, setReminderDone] = useState(false);

  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i + 1));

  const handleConfirm = () => {
    if (!selectedDoctor || !selectedTime) return;
    const dateStr = format(dates[selectedDay], 'MMMM d, yyyy');
    setBooking({
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: dateStr,
      time: selectedTime,
      zoomLink: 'https://zoom.us/j/1234567890',
      confirmed: true,
    });
    setConfirmed(true);
    setTimeout(() => setShowEmail(true), 1500);
    setTimeout(() => setReminderDone(true), 4000);
  };

  if (confirmed && selectedDoctor) {
    const dateStr = format(dates[selectedDay], 'MMMM d, yyyy');
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-12">
          <div className="mx-auto max-w-xl">
            {/* Confirmation */}
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">Your Consultation is Confirmed</h2>
                <div className="mt-6 space-y-3 rounded-lg bg-muted p-5 text-left text-sm">
                  <div className="flex items-center gap-3"><span className="text-3xl">{selectedDoctor.avatar}</span><div><p className="font-semibold">{selectedDoctor.name}</p><p className="text-xs text-muted-foreground">{selectedDoctor.qualifications}</p></div></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />{dateStr} at {selectedTime}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />15–20 minutes</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Video className="h-4 w-4" /><a href="https://zoom.us/j/1234567890" className="text-primary underline" target="_blank" rel="noopener noreferrer">zoom.us/j/1234567890</a></div>
                  <p className="text-xs text-muted-foreground">Join from any device with a camera and microphone.</p>
                </div>
              </CardContent>
            </Card>

            {/* What to expect */}
            <Card className="mt-6">
              <CardHeader><CardTitle className="text-base">What to Expect</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Your doctor has received your health assessment and will review it before your call.</p>
                <p>• Be prepared to discuss your health goals, current medications, and any concerns.</p>
                <p>• The doctor will determine if medication is clinically appropriate for you.</p>
              </CardContent>
            </Card>

            {/* Reminder timeline */}
            <Card className="mt-6">
              <CardHeader><CardTitle className="text-base">Appointment Timeline</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TimelineItem done icon={<CheckCircle2 className="h-4 w-4" />} label="Booking confirmed" time="Just now" />
                  <TimelineItem done icon={<Mail className="h-4 w-4" />} label="Email confirmation sent" time="Just now" />
                  <TimelineItem done={reminderDone} icon={<Phone className="h-4 w-4" />} label={`Reminder call scheduled for ${format(dates[selectedDay], 'MMM d')} at 10:00 AM`} time={reminderDone ? 'Completed' : 'Pending'} />
                  {reminderDone && <TimelineItem done icon={<CheckCircle2 className="h-4 w-4" />} label="Reminder call completed — User confirmed attendance" time="Just now" />}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setShowEmail(true)} className="gap-2"><Mail className="h-4 w-4" /> View Email Confirmation</Button>
            </div>
          </div>
        </div>

        {/* Email modal */}
        <Dialog open={showEmail} onOpenChange={setShowEmail}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle className="text-base">📧 Email Confirmation</DialogTitle></DialogHeader>
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
              <p className="text-xs text-muted-foreground">From: Laso Health &lt;appointments@laso.health&gt;</p>
              <p className="text-xs text-muted-foreground">Subject: Your consultation with {selectedDoctor.name} is confirmed</p>
              <hr className="my-3 border-border" />
              <p className="font-medium">Hello {quizData?.gender === 'Male' ? 'Mr.' : quizData?.gender === 'Female' ? 'Ms.' : ''} Patient,</p>
              <p className="mt-2 text-muted-foreground">Your video consultation has been confirmed:</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li><strong>Doctor:</strong> {selectedDoctor.name}</li>
                <li><strong>Date:</strong> {dateStr}</li>
                <li><strong>Time:</strong> {selectedTime}</li>
                <li><strong>Duration:</strong> 15–20 minutes</li>
                <li><strong>Zoom:</strong> <a href="#" className="text-primary">zoom.us/j/1234567890</a></li>
              </ul>
              <p className="mt-3 text-muted-foreground">We'll call you 24 hours before to confirm your attendance.</p>
              <Button size="sm" variant="outline" className="mt-4 gap-2"><Calendar className="h-3 w-3" /> Add to Calendar</Button>
            </div>
          </DialogContent>
        </Dialog>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Book Your Consultation</h1>
          <p className="mt-2 text-muted-foreground">Choose a physician and select a time that works for you.</p>

          {/* Pre-Consult Summary */}
          {quizData && (
            <Card className="mt-6 border-primary/20 bg-primary/5">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Pre-Consultation Summary</p>
                    <p className="mt-1 text-xs text-muted-foreground">This profile will be shared with your doctor before the call.</p>
                    <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                      <p className="text-muted-foreground">Age: <span className="text-foreground">{quizData.age}</span></p>
                      <p className="text-muted-foreground">Gender: <span className="text-foreground">{quizData.gender}</span></p>
                      <p className="text-muted-foreground">BMI: <span className="text-foreground">{quizData.bmi}</span></p>
                      <p className="text-muted-foreground">Program: <span className="text-foreground">{quizData.program === 'weight-loss' ? 'Weight Loss' : quizData.program === 'diabetes' ? 'Diabetes' : 'Both'}</span></p>
                      {quizData.conditions.length > 0 && (
                        <p className="col-span-2 text-muted-foreground">Conditions: <span className="text-foreground">{quizData.conditions.join(', ')}</span></p>
                      )}
                      {quizData.hba1c && (
                        <p className="text-muted-foreground">HbA1c: <span className="text-foreground">{quizData.hba1c}%</span></p>
                      )}
                    </div>
                    {/* Risk flags */}
                    {(quizData.conditions.includes('Heart disease') || quizData.conditions.includes('Kidney disease')) && (
                      <div className="mt-3 flex items-start gap-2 rounded-md bg-accent/10 p-2">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <p className="text-[11px] text-accent">Flagged for additional screening — your doctor will discuss this during the consultation.</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Doctor cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {doctors.map(doc => (
              <Card key={doc.id} className={`cursor-pointer transition-all hover:shadow-md ${selectedDoctor?.id === doc.id ? 'border-primary ring-2 ring-primary/20' : ''}`} onClick={() => setSelectedDoctor(doc)}>
                <CardContent className="pt-5">
                  <div className="text-center">
                    <span className="text-4xl">{doc.avatar}</span>
                    <h3 className="mt-2 font-semibold text-foreground">{doc.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{doc.qualifications}</p>
                    <p className="mt-1 text-xs text-muted-foreground">MCI Reg: {doc.mciReg}</p>
                    <Badge variant="secondary" className="mt-2">{doc.experience}+ years</Badge>
                    <p className="mt-2 text-xs text-muted-foreground">{doc.specialty}</p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="text-sm font-medium">{doc.rating}</span>
                      <span className="text-xs text-muted-foreground">({doc.consultations})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Slot picker */}
          {selectedDoctor && (
            <Card className="mt-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-base">Select a Time Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((d, i) => (
                    <button key={i} onClick={() => { setSelectedDay(i); setSelectedTime(''); }}
                      className={`flex min-w-[70px] flex-col items-center rounded-lg border p-2 text-xs font-medium transition-colors ${selectedDay === i ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                      <span>{format(d, 'EEE')}</span>
                      <span className="text-lg">{format(d, 'd')}</span>
                      <span>{format(d, 'MMM')}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {timeSlots.map(t => {
                    const booked = bookedSlots[selectedDay]?.includes(t);
                    return (
                      <button key={t} disabled={booked} onClick={() => setSelectedTime(t)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${booked ? 'cursor-not-allowed border-border bg-muted text-muted-foreground line-through' : selectedTime === t ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary'}`}>
                        {t}
                      </button>
                    );
                  })}
                </div>
                {selectedTime && (
                  <div className="mt-6">
                    <p className="mb-4 text-sm text-muted-foreground">
                      15-minute video consultation with <strong>{selectedDoctor.name}</strong> on <strong>{format(dates[selectedDay], 'MMMM d, yyyy')}</strong> at <strong>{selectedTime}</strong>
                    </p>
                    <Button onClick={handleConfirm} className="gap-2">
                      Confirm Booking <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function TimelineItem({ done, icon, label, time }: { done: boolean; icon: React.ReactNode; label: string; time: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${done ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{icon}</div>
      <div>
        <p className={`text-sm ${done ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{label}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
