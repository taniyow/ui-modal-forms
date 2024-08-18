import { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

interface StepperProps {
  currentStep: number
  onStepChange: (step: number) => void
}

export function Stepper({ currentStep, onStepChange }: StepperProps) {
  const steps = [
    'Business Info',
    'Transactions',
    'Ownership',
    'Documents',
    'Banking',
    'Review',
  ]

  return (
    <ol className="flex items-center w-full mb-4 space-x-2 text-sm font-medium text-center text-gray-700 bg-white sm:text-base">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`flex items-center uppercase cursor-pointer ${
            index <= currentStep
              ? 'text-blue-600 dark:text-blue-500'
              : 'text-gray-700'
          }`}
          onClick={() => onStepChange(index)}
        >
          {step}
          {index < steps.length - 1 && (
            <IoIosArrowForward className="text-bold ms-2 sm:ms-4" />
          )}
        </li>
      ))}
    </ol>
  )
}
