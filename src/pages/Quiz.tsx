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
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

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

  // Real-time interpretation helpers
  const getAgeInterpretation = () => {
    const a = Number(age);
    if (!a) return null;
    if (a < 18) return { text: 'This program is available for adults aged 18 and above.', severity: 'destructive' as const };
    if (a >= 18 && a <= 30) return { text: 'GLP-1 medications are typically well-tolerated in younger adults. Your doctor will assess suitability.', severity: 'muted' as const };
    if (a >= 31 && a <= 55) return { text: 'This age group has the most clinical trial data supporting GLP-1 therapy for weight management.', severity: 'muted' as const };
    if (a >= 56) return { text: 'Additional monitoring may be recommended for patients above 55. Your doctor will discuss this.', severity: 'muted' as const };
    return null;
  };

  const getBMIInterpretation = () => {
    if (!bmi || !bmiInfo) return null;
    const interpretations: string[] = [];
    if (bmi >= 30) {
      interpretations.push('You may benefit from GLP-1 therapy. In clinical trials, patients with BMI ≥30 showed the most significant weight loss.');
    } else if (bmi >= 27) {
      interpretations.push('GLP-1 medications may be considered if you have at least one weight-related comorbidity (e.g., Type 2 diabetes, hypertension).');
    } else if (bmi >= 25) {
      interpretations.push('Based on your BMI, medication may not be the first recommendation. Your doctor can discuss lifestyle-based approaches.');
    }
    return interpretations;
  };

  const getConditionInterpretation = () => {
    const flags: string[] = [];
    if (conditions.includes('Heart disease')) flags.push('Heart disease requires additional screening before starting GLP-1 therapy.');
    if (conditions.includes('Kidney disease')) flags.push('Renal function will be assessed — dose adjustments may be needed.');
    if (conditions.includes('Liver disease')) flags.push('Liver function tests may be required before prescribing.');
    if (conditions.includes('Type 2 Diabetes') && program === 'weight-loss') flags.push('Your Type 2 Diabetes will be factored into your treatment plan — GLP-1 medications can address both weight and blood sugar.');
    if (conditions.includes('PCOS')) flags.push('PCOS is commonly associated with insulin resistance. GLP-1 therapy may provide dual benefit.');
    return flags;
  };

  const renderStep = () => {
    switch (step) {
      case 1: {
        const ageInterp = getAgeInterpretation();
        return (
          <div className="space-y-4">
            <Label htmlFor="age">How old are you?</Label>
            <Input id="age" type="number" min={18} max={75} placeholder="e.g. 35" value={age} onChange={e => setAge(e.target.value)} />
            {ageInterp && (
              <div className={`flex items-start gap-2 rounded-lg p-3 ${ageInterp.severity === 'destructive' ? 'bg-destructive/10' : 'bg-muted'}`}>
                <Info className={`mt-0.5 h-4 w-4 shrink-0 ${ageInterp.severity === 'destructive' ? 'text-destructive' : 'text-muted-foreground'}`} />
                <p className={`text-xs ${ageInterp.severity === 'destructive' ? 'text-destructive' : 'text-muted-foreground'}`}>{ageInterp.text}</p>
              </div>
            )}
          </div>
        );
      }
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
            {gender && (
              <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Gender is used for clinical context — certain dosing and risk factors vary by biological sex.</p>
              </div>
            )}
          </div>
        );
      case 3: {
        const bmiInterps = getBMIInterpretation();
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
              <div className="space-y-3">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium text-foreground">Your BMI: <span className={bmiInfo.color}>{bmi} ({bmiInfo.label})</span></p>
                  {/* BMI scale visualization */}
                  <div className="mt-3">
                    <div className="flex text-[10px] text-muted-foreground">
                      <span className="flex-1">Underweight</span>
                      <span className="flex-1 text-center">Normal</span>
                      <span className="flex-1 text-center">Overweight</span>
                      <span className="flex-1 text-right">Obese</span>
                    </div>
                    <div className="mt-1 flex h-2 overflow-hidden rounded-full">
                      <div className="w-[18%] bg-blue-400" />
                      <div className="w-[25%] bg-success" />
                      <div className="w-[20%] bg-accent" />
                      <div className="flex-1 bg-destructive" />
                    </div>
                    <div className="relative mt-1">
                      <div className="absolute h-3 w-0.5 bg-foreground" style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }} />
                    </div>
                  </div>
                </div>
                {bmiInterps && bmiInterps.map((interp, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-xs text-primary">{interp}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
      case 4:
        return (
          <div className="space-y-4">
            <Label>What are you seeking help with?</Label>
            <div className="space-y-3">
              {[
                { value: 'weight-loss' as const, label: 'Weight Loss', desc: 'GLP-1 based medical weight management' },
                { value: 'diabetes' as const, label: 'Type 2 Diabetes Management', desc: 'Blood sugar control with evidence-based medications' },
                { value: 'both' as const, label: 'Both', desc: 'Combined weight and diabetes management' },
              ].map(opt => (
                <button key={opt.value} onClick={() => setProgram(opt.value)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${program === opt.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
                  <p className={`text-sm font-medium ${program === opt.value ? 'text-primary' : 'text-muted-foreground'}`}>{opt.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 5: {
        const condInterps = getConditionInterpretation();
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
            {condInterps.length > 0 && (
              <div className="space-y-2">
                {condInterps.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg bg-accent/10 p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-xs text-accent">{flag}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
      case 6:
        return (
          <div className="space-y-4">
            <Label htmlFor="meds">List any medications you currently take</Label>
            <Input id="meds" placeholder="e.g. Metformin 500mg, Amlodipine 5mg" value={medications} onChange={e => setMedications(e.target.value)} disabled={noMeds} />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox checked={noMeds} onCheckedChange={(c) => { setNoMeds(!!c); if (c) setMedications(''); }} />
              I am not currently taking any medications
            </label>
            {medications && !noMeds && (
              <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Your doctor will review potential drug interactions during consultation. Some medications may require dose adjustments when starting GLP-1 therapy.</p>
              </div>
            )}
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
                {hba1c && Number(hba1c) >= 4 && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg bg-muted p-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {Number(hba1c) < 5.7 ? 'Your HbA1c is in the normal range.' :
                       Number(hba1c) < 6.5 ? 'This indicates pre-diabetes. Lifestyle modifications and monitoring are typically recommended.' :
                       Number(hba1c) < 8 ? 'This indicates diabetes. Medication management combined with lifestyle changes can help bring this into target range.' :
                       'This indicates poorly controlled diabetes. Your doctor will prioritize glycemic control in your treatment plan.'}
                    </p>
                  </div>
                )}
              </div>
            )}
            {hba1cKnown === 'untested' && (
              <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Your doctor may recommend an HbA1c test as part of your initial assessment. This is a routine blood test available at most labs.</p>
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

                  {/* Pre-consult Summary */}
                  {bmi > 0 && (
                    <div className="mx-auto mt-6 max-w-sm rounded-lg border border-border bg-muted/50 p-4 text-left">
                      <p className="text-xs font-semibold text-foreground">Your Profile Summary</p>
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <p>Age: {age} · Gender: {gender}</p>
                        <p>BMI: {bmi} ({bmiInfo?.label})</p>
                        <p>Program: {program === 'weight-loss' ? 'Weight Loss' : program === 'diabetes' ? 'Diabetes' : 'Both'}</p>
                        {conditions.length > 0 && <p>Conditions: {conditions.join(', ')}</p>}
                        {hba1c && <p>HbA1c: {hba1c}%</p>}
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground">This summary will be shared with your doctor before the consultation.</p>
                    </div>
                  )}

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
