import { Progress } from '@/components/ui/progress';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export default function QuizProgress({ currentStep, totalSteps }: Props) {
  const percent = Math.round((currentStep / totalSteps) * 100);
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Step {currentStep} of {totalSteps}</span>
        <span className="text-muted-foreground">{percent}% complete</span>
      </div>
      <Progress value={percent} className="h-2" />
    </div>
  );
}
