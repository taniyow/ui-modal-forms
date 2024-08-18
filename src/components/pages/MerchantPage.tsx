'use client'

import { useState } from 'react'

import { Stepper } from '@/components/custom/stepper'
import DocumentForm from '@/components/forms/DocumentForm'
import OwnershipForm from '@/components/forms/OwnershipForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function MerchantPage() {
  const [currentStep, setCurrentStep] = useState(2)
  const [isOpen, setIsOpen] = useState(false)

  const renderForm = () => {
    switch (currentStep) {
      case 2:
        return (
          <OwnershipForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )
      case 3:
        return (
          <DocumentForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="font-bold"
            onClick={() => setIsOpen(true)}
          >
            Create Merchant
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[80%] md:max-w-[70%] px-16 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <Stepper
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />
            </DialogTitle>
          </DialogHeader>

          {renderForm()}

          <DialogFooter>
            <div className="flex justify-between w-full">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  className="bg-gray-400 text-white"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              {currentStep < 5 && (
                <Button
                  variant="default"
                  className="bg-[#034591] text-white"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              )}
              {currentStep === 5 && (
                <Button variant="default" onClick={() => setIsOpen(false)}>
                  Submit
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
