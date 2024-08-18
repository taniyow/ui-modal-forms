'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormProps {
  currentStep: number
  setCurrentStep: (step: number) => void
}

const documentTypes = [
  { value: 'BankLetter', label: 'Bank Letter' },
  { value: 'PhotoIdentification', label: 'Photo Identification' },
  { value: 'TaxReturn', label: 'Tax Return' },
  { value: 'BankStatement', label: 'Bank Statement' },
  { value: 'VoidedCheck', label: 'Voided Check' },
  { value: 'BusinessLicense', label: 'Business License' },
  { value: 'UtilityBill', label: 'Utility Bill' },
  {
    value: 'PreviousProcessorStatements',
    label: 'Previous Processor Statements',
  },
  { value: 'ApplicationUnredacted', label: 'Application Unredacted' },
  {
    value: 'OtherUnderwritingDocuments',
    label: 'Other Underwriting Documents',
  },
  { value: 'EquipmentOrderingForm', label: 'Equipment Ordering Form' },
  { value: 'UnderwritingDocuments', label: 'Underwriting Documents' },
  { value: 'AgentContract', label: 'Agent Contract' },
  { value: 'SignedScheduleA', label: 'Signed Schedule A' },
  { value: 'ResidualSplitprofileEmail', label: 'Residual Split Profile Email' },
  { value: 'Other', label: 'Other' },
  { value: 'NailSoft', label: 'Nail Soft Set up' },
]

interface AdditionalField {
  type: string
  files: File[]
}

export default function DocumentForm({
  currentStep,
  setCurrentStep,
}: FormProps) {
  const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>(
    [],
  )

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (newFile) =>
          !additionalFields[index].files.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size,
          ),
      )
      setAdditionalFields((prev) =>
        prev.map((field, i) =>
          i === index
            ? { ...field, files: [...field.files, ...newFiles] }
            : field,
        ),
      )
    }
  }

  const addAdditionalField = (type: string) => {
    setAdditionalFields((prev) => [...prev, { type, files: [] }])
  }

  const renderFileInput = (
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    acceptTypes: string,
    description: string,
  ) => (
    <div className="flex items-center space-x-4">
      <div className="relative flex items-center space-x-4">
        <label className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 font-medium rounded-full cursor-pointer">
          Choose Files
          <Input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            multiple
            accept={acceptTypes}
            onChange={onChange}
          />
        </label>
        <span className="text-gray-500">No file chosen</span>
      </div>
      <Button variant="default" className="bg-[#034591]">
        Upload
      </Button>
    </div>
  )

  return (
    <div className="space-y-8 mb-6">
      {/* Existing fixed file inputs */}
      <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Photo Identification:
        </label>
        {renderFileInput(
          (e) => handleFileChange(e, 0),
          'image/*',
          'Photo Identification',
        )}
      </div>

      <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Bank Letter or Voided Check:
        </label>
        {renderFileInput(
          (e) => handleFileChange(e, 1),
          '.pdf,.jpg,.jpeg,.png',
          'Bank Letter or Voided Check',
        )}
      </div>

      <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
        <label className="mb-2 text-sm font-medium text-gray-700">
          3 months of Bank Statements:
        </label>
        {renderFileInput(
          (e) => handleFileChange(e, 2),
          '.pdf,.jpg,.jpeg,.png',
          '3 months of Bank Statements',
        )}
      </div>

      {/* Additional fields dynamically added */}
      {additionalFields.map((field, index) => (
        <div
          key={index}
          className="flex flex-col p-4 border border-gray-300 rounded-lg mb-4"
        >
          <label className="mb-2 text-sm font-medium text-gray-700">
            {documentTypes.find((doc) => doc.value === field.type)?.label || ''}
          </label>
          {renderFileInput(
            (e) => handleFileChange(e, index + 3),
            '.pdf,.jpg,.jpeg,.png', // Adjust acceptable file types based on the type if needed
            documentTypes.find((doc) => doc.value === field.type)?.label || '',
          )}
        </div>
      ))}

      {/* Dropdown to add additional document types */}
      <div className="flex justify-between mt-4 w-1/2">
        <Select onValueChange={(value) => addAdditionalField(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Additional document types" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((doc) => (
              <SelectItem key={doc.value} value={doc.value}>
                {doc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
