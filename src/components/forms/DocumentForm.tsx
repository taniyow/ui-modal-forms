'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

export default function DocumentForm({
  currentStep,
  setCurrentStep,
}: FormProps) {
  const [files1, setFiles1] = useState<File[]>([])
  const [files2, setFiles2] = useState<File[]>([])
  const [files3, setFiles3] = useState<File[]>([])

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  ) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const renderFileInput = (
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) => (
    <div className="relative flex items-center space-x-4">
      <label className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-full cursor-pointer">
        Choose Files
        <Input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          multiple
          onChange={onChange}
        />
      </label>
      <span className="text-gray-500">No file chosen</span>
    </div>
  )

  return (
    <div className="space-y-8 mb-6">
      <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Photo Identification:
        </label>
        <div className="flex items-center space-x-4">
          {renderFileInput((e) => handleFileChange(e, setFiles1))}
          <Button variant="default" className="bg-[#034591]">
            Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Bank Letter or Voided Check:
        </label>
        <div className="flex items-center space-x-4">
          {renderFileInput((e) => handleFileChange(e, setFiles2))}
          <Button variant="default" className="bg-[#034591]">
            Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
        <label className="mb-2 text-sm font-medium text-gray-700">
          3 months of Bank Statements:
        </label>
        <div className="flex items-center space-x-4">
          {renderFileInput((e) => handleFileChange(e, setFiles3))}
          <Button variant="default" className="bg-[#034591]">
            Upload
          </Button>
        </div>
      </div>
    </div>
  )
}
