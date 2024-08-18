'use client'

import { Button } from '@/components/ui/button'

interface FormProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export default function DocumentForm({
  currentStep,
  setCurrentStep,
}: FormProps) {
  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 5))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0))

  const onSubmit = (data: any) => {
    console.log('Document data:', data)
    nextStep()
  }

  return <div>Document Form</div>
}
