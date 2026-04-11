import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { calculateBMI, getBMICategory } from '@/lib/bmiCalculator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import QuizProgress from '@/components/quiz/QuizProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';

const conditionsList = ['Type 2 Diabetes', 'Hypertension', 'PCOS', 'Thyroid disorder', 'Heart disease', 'Kidney disease', 'Liver disease'];

export default function Quiz() {
  const navigate = useNavigate();
  const { setQuizCompleted, setQuizData, setSelectedProgram } = useUser();
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [program, setProgram] = useState<'weight-loss' | 'diabetes' | 'both'>('weight-loss');
  const [conditions, setConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState('');
  const [noMeds, setNoMeds] = useState(false);
  const [pregnant, setPregnant] = useState(false);
  const [thyroidCancer, setThyroidCancer] = useState(false);
  const [type1, setType1] = useState(false);
  const [hba1cKnown, setHba1cKnown] = useState<'yes' | 'no' | 'untested'>('no');
  const [hba1c, setHba1c] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const bmi = height && weight ? calculateBMI(Number(height), Number(weight)) : 0;
  const bmiInfo = bmi ? getBMICategory(bmi) : null;
  const hasContraindication = pregnant || thyroidCancer || type1;
  const showHba1c = program === 'diabetes' || program === 'both';
  const totalSteps = showHba1c ? 8 : 7;

  const validate = (): boolean => {
    const errs: string[] = [];
    if (step === 1 && (!age || Number(age) < 18 || Number(age) > 75)) errs.push('Please enter a valid age (18–75).');
    if (step === 2 && !gender) errs.push('Please select a gender.');
    if (step === 3 && (!height || !weight || Number(height) < 100 || Number(weight) < 30)) errs.push('Please enter valid height (cm) and weight (kg).');
    setErrors(errs);
    return errs.length === 0;
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, totalSteps + 1)); };
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const finish = () => {
    setQuizData({
      age: Number(age), gender, height: Number(height), weight: Number(weight), bmi,
      program, conditions, medications: noMeds ? 'None' : medications,
      contraindications: [pregnant && 'pregnant', thyroidCancer && 'thyroid_cancer', type1 && 'type1'].filter(Boolean) as string[],
      hba1c: hba1cKnown === 'yes' ? hba1c : '',
    });
    setQuizCompleted(true);
    setSelectedProgram(program);
    setStep(totalSteps + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="age">How old are you?</Label>
            <Input id="age" type="number" min={18} max={75} placeholder="e.g. 35" value={age} onChange={e => setAge(e.target.value)} />
            {Number(age) > 0 && Number(age) < 18 && <p className="text-sm text-destructive">This program is available for adults aged 18 and above.</p>}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label>What is your gender?</Label>
            <div className="grid grid-cols-2 gap-3">
              {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
                <button key={g} onClick={() => setGender(g)}
                  className={`rounded-lg border p-3 text-sm font-medium transition-colors ${gender === g ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" placeholder="e.g. 170" value={height} onChange={e => setHeight(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="e.g. 85" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
            </div>
            {bmi > 0 && bmiInfo && (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium text-foreground">Your BMI: <span className={bmiInfo.color}>{bmi} ({bmiInfo.label})</span></p>
                {bmi < 25 && <p className="mt-2 text-xs text-muted-foreground">Based on your BMI, you may not be eligible for weight loss medication. A doctor can discuss other options during consultation.</p>}
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <Label>What are you seeking help with?</Label>
            <div className="space-y-3">
              {[
                { value: 'weight-loss' as const, label: 'Weight Loss' },
                { value: 'diabetes' as const, label: 'Type 2 Diabetes Management' },
                { value: 'both' as const, label: 'Both' },
              ].map(opt => (
                <button key={opt.value} onClick={() => setProgram(opt.value)}
                  className={`w-full rounded-lg border p-4 text-left text-sm font-medium transition-colors ${program === opt.value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <Label>Do you have any of these existing conditions?</Label>
            <div className="space-y-2">
              {conditionsList.map(c => (
                <label key={c} className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm hover:bg-muted/50">
                  <Checkbox checked={conditions.includes(c)} onCheckedChange={(checked) => {
                    setConditions(prev => checked ? [...prev, c] : prev.filter(x => x !== c));
                  }} />
                  {c}
                </label>
              ))}
              <label className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm hover:bg-muted/50">
                <Checkbox checked={conditions.length === 0} onCheckedChange={() => setConditions([])} />
                None of the above
              </label>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <Label htmlFor="meds">List any medications you currently take</Label>
            <Input id="meds" placeholder="e.g. Metformin 500mg, Amlodipine 5mg" value={medications} onChange={e => setMedications(e.target.value)} disabled={noMeds} />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox checked={noMeds} onCheckedChange={(c) => { setNoMeds(!!c); if (c) setMedications(''); }} />
              I am not currently taking any medications
            </label>
          </div>
        );
      case 7: {
        const isLastNonHba1c = !showHba1c;
        return (
          <div className="space-y-4">
            <Label>Contraindication screening</Label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 rounded-lg border border-border p-3 text-sm">
                <Checkbox checked={pregnant} onCheckedChange={(c) => setPregnant(!!c)} className="mt-0.5" />
                <div>
                  <p className="font-medium">Are you pregnant or planning to become pregnant?</p>
                  {pregnant && <p className="mt-1 text-xs text-destructive">GLP-1 medications are contraindicated during pregnancy. Please consult your physician in person.</p>}
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-lg border border-border p-3 text-sm">
                <Checkbox checked={thyroidCancer} onCheckedChange={(c) => setThyroidCancer(!!c)} className="mt-0.5" />
                <div>
                  <p className="font-medium">Personal or family history of medullary thyroid carcinoma or MEN 2 syndrome?</p>
                  {thyroidCancer && <p className="mt-1 text-xs text-destructive">Based on your response, GLP-1 receptor agonists may not be appropriate. A doctor will review your case.</p>}
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-lg border border-border p-3 text-sm">
                <Checkbox checked={type1} onCheckedChange={(c) => setType1(!!c)} className="mt-0.5" />
                <div>
                  <p className="font-medium">Have you been diagnosed with Type 1 diabetes or diabetic ketoacidosis?</p>
                  {type1 && <p className="mt-1 text-xs text-destructive">This program is designed for Type 2 diabetes. Please consult your endocrinologist for Type 1 management.</p>}
                </div>
              </label>
            </div>
            {isLastNonHba1c && (
              <Button onClick={finish} className="mt-4 w-full gap-2">View Results <ArrowRight className="h-4 w-4" /></Button>
            )}
          </div>
        );
      }
      case 8:
        if (!showHba1c) return null;
        return (
          <div className="space-y-4">
            <Label>Do you know your most recent HbA1c level?</Label>
            <div className="space-y-3">
              {[
                { value: 'yes' as const, label: 'Yes' },
                { value: 'no' as const, label: "No / I don't know" },
                { value: 'untested' as const, label: "Haven't been tested" },
              ].map(opt => (
                <button key={opt.value} onClick={() => setHba1cKnown(opt.value)}
                  className={`w-full rounded-lg border p-3 text-left text-sm font-medium transition-colors ${hba1cKnown === opt.value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
            {hba1cKnown === 'yes' && (
              <div>
                <Label htmlFor="hba1c-val">HbA1c value (%)</Label>
                <Input id="hba1c-val" type="number" step="0.1" min="4" max="14" placeholder="e.g. 7.5" value={hba1c} onChange={e => setHba1c(e.target.value)} />
              </div>
            )}
            <Button onClick={finish} className="mt-4 w-full gap-2">View Results <ArrowRight className="h-4 w-4" /></Button>
          </div>
        );
      default:
        return null;
    }
  };

  // Result screen
  if (step > totalSteps) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-16">
          <Card className="mx-auto max-w-xl">
            <CardContent className="pt-6 text-center">
              {hasContraindication ? (
                <>
                  <AlertTriangle className="mx-auto h-12 w-12 text-accent" />
                  <h2 className="mt-4 text-xl font-bold text-foreground">Additional Review Needed</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Based on some of your responses, we recommend an in-person consultation with a specialist before proceeding. Our team will follow up with guidance.
                  </p>
                  <Button variant="outline" className="mt-6" disabled>We'll be in touch</Button>
                </>
              ) : (
                <>
                  <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                  <h2 className="mt-4 text-xl font-bold text-foreground">You May Be Eligible</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Based on your responses, you may be a candidate for our {program === 'weight-loss' ? 'Weight Loss' : program === 'diabetes' ? 'Diabetes Management' : 'Weight Loss & Diabetes'} program. The next step is a consultation with one of our physicians, who will review your health profile and determine the most appropriate treatment plan.
                  </p>
                  <Button onClick={() => navigate('/consult')} className="mt-6 gap-2">
                    Book Your Consultation <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              <p className="mt-6 text-xs text-muted-foreground">
                This assessment does not constitute a medical diagnosis. All treatment decisions are made by a licensed physician during your consultation.
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const stepTitles = ['Your Age', 'Gender', 'Body Metrics', 'Program Selection', 'Existing Conditions', 'Current Medications', 'Screening', 'HbA1c'];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12">
        <div className="mx-auto max-w-xl">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Health Assessment</h1>
          <p className="mb-6 text-sm text-muted-foreground">This information helps our physicians evaluate your suitability for treatment.</p>
          <QuizProgress currentStep={step} totalSteps={totalSteps} />
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{stepTitles[step - 1]}</CardTitle>
              <CardDescription>Step {step} of {totalSteps}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderStep()}
              {errors.length > 0 && (
                <div className="mt-4 rounded-lg bg-destructive/10 p-3">
                  {errors.map((e, i) => <p key={i} className="text-sm text-destructive">{e}</p>)}
                </div>
              )}
              <div className="mt-6 flex gap-3">
                {step > 1 && <Button variant="outline" onClick={prev} className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>}
                {step < totalSteps && !(step === 7 && !showHba1c) && (
                  <Button onClick={next} className="ml-auto gap-2">Next <ArrowRight className="h-4 w-4" /></Button>
                )}
              </div>
            </CardContent>
          </Card>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Your data is kept confidential and shared only with your treating physician.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
