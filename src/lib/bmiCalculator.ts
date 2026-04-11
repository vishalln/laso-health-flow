export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-accent" };
  if (bmi < 25) return { label: "Normal weight", color: "text-success" };
  if (bmi < 30) return { label: "Overweight", color: "text-accent" };
  if (bmi < 35) return { label: "Obese Class I", color: "text-destructive" };
  if (bmi < 40) return { label: "Obese Class II", color: "text-destructive" };
  return { label: "Obese Class III", color: "text-destructive" };
}
