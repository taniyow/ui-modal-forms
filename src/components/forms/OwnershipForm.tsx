'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { LucideCalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'

import { PhoneNumberInput } from '@/components/custom/phone-input'
import { formatSSN } from '@/components/helpers'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string(),
  title: z.string().min(1, 'Title/Position is required'),
  ownershipPercentage: z.number().min(1, 'Ownership % is required'),
  phoneNumber: z.string().min(1, 'Phone Number is required'),
  address: z.string().min(1, 'Address is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.number().min(1, 'Zip Code is required'),
  ssn: z.string().min(1, 'SSN is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  email: z.string().min(1, 'Email Address is required'),
})

export type FormData = z.infer<typeof formSchema>

interface FormProps {
  currentStep: number
  setCurrentStep: (step: number) => void
  setOwnershipData: (data: FormData[]) => void
  ownershipData: FormData[]
}

export default function OwnershipForm({
  currentStep,
  setCurrentStep,
  setOwnershipData,
  ownershipData,
}: FormProps) {
  const initialValues = {
    firstName: '',
    lastName: '',
    title: '',
    ownershipPercentage: 0,
    phoneNumber: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: 0,
    ssn: '',
    dateOfBirth: '',
    email: '',
  }

  const [owners, setOwners] = useState<FormData[]>(
    ownershipData.length > 0 ? ownershipData : [initialValues],
  )
  const [isSignificantResponsibility, setIsSignificantResponsibility] =
    useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 5))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0))

  const addNewOwner = () => {
    if (owners.length < 4) {
      setOwners([...owners, initialValues])
    }
  }

  const resetOwners = () => {
    setOwners([initialValues])
  }

  const handleOwnerChange = (
    index: number,
    field: keyof FormData,
    value: string,
  ) => {
    const updatedOwners = [...owners]
    updatedOwners[index] = {
      ...updatedOwners[index],
      [field]: value,
    }
    setOwners(updatedOwners)
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
    setOwnershipData(owners)
    nextStep()
  }

  useEffect(() => {
    setOwnershipData(owners)
  }, [owners, setOwnershipData])

  return (
    <div>
      <div className="my-4">
        Provide the following information for each individual who owns, directly
        or indirectly, 25 % or more of the equity interest of your business. If
        no single owner owns more than 25%, an individual with significant
        responsibility can be added as principal 1*.
      </div>
      <div className="my-4">
        *Individual with significant responsibility includes an executive
        officer or owner with authority to control, manage, and direct the legal
        entity (e.g. a Chief Executive Officer, Chief Financial Officer,
        Managing Member, General Partner, President, Vice President, or
        Treasurer) or any individual with authority to perform such functions.
      </div>
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <Checkbox
          id="significantResponsibility"
          checked={isSignificantResponsibility}
          onCheckedChange={(checked) =>
            setIsSignificantResponsibility(checked === true)
          }
          onClick={() => {
            if (owners.length > 1) {
              resetOwners()
            }
          }}
        />
        <label
          htmlFor="significantResponsibility"
          className="text-base text-gray-800 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Is an individual with significant responsibility
        </label>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          {owners.map((owner, index) => (
            <div key={index}>
              <hr className="my-6 border-gray-300" />

              <h2 className="text-lg font-semibold mb-4">
                {isSignificantResponsibility && index === 0
                  ? 'CONTROL PRONG (must reside in US)'
                  : `OWNER ${index + 1}`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        First Name:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          value={owner.firstName}
                          onChange={(e) =>
                            handleOwnerChange(
                              index,
                              'firstName',
                              e.target.value,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Last Name:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          value={owner.lastName}
                          onChange={(e) =>
                            handleOwnerChange(index, 'lastName', e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Title / Position:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Title / Position"
                          {...field}
                          value={owner.title}
                          onChange={(e) =>
                            handleOwnerChange(index, 'title', e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isSignificantResponsibility && index === 0 && (
                  <FormField
                    control={form.control}
                    name="ownershipPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">
                          Ownership %:
                          <span className="text-red-500 mx-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter ownership"
                            {...field}
                            value={owner.ownershipPercentage}
                            onChange={(e) =>
                              handleOwnerChange(
                                index,
                                'ownershipPercentage',
                                e.target.value,
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Home / Mobile Phone Number:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <PhoneNumberInput />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Home Address:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Home Address"
                          {...field}
                          value={owner.address}
                          onChange={(e) =>
                            handleOwnerChange(index, 'address', e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Country:<span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            handleOwnerChange(index, 'country', value)
                          }
                          defaultValue={
                            isSignificantResponsibility && index === 0
                              ? 'United States'
                              : owner.country
                          }
                          disabled={isSignificantResponsibility && index === 0}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">
                              United States
                            </SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Philippines">
                              Philippines
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        State:<span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            handleOwnerChange(index, 'state', value)
                          }
                          defaultValue={owner.state}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alaska">Alaska</SelectItem>
                            <SelectItem value="California">
                              California
                            </SelectItem>
                            <SelectItem value="Washington">
                              Washington
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        City:<span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            handleOwnerChange(index, 'city', value)
                          }
                          defaultValue={owner.city}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Los Angeles">
                              Los Angeles
                            </SelectItem>
                            <SelectItem value="San Francisco">
                              San Francisco
                            </SelectItem>
                            <SelectItem value="San Diego">San Diego</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Zip Code:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Zip Code"
                          {...field}
                          value={owner.zipCode}
                          onChange={(e) =>
                            handleOwnerChange(index, 'zipCode', e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="ssn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Social Security Number (SSN):
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Social Security Number (SSN)"
                          {...field}
                          value={formatSSN(owner.ssn)}
                          onChange={(e) =>
                            handleOwnerChange(
                              index,
                              'ssn',
                              formatSSN(e.target.value),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Date of Birth:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              <LucideCalendarDays className="w-4 h-4 mr-2" />
                              {field.value ? (
                                format(new Date(field.value), 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Email Address:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          value={owner.email}
                          onChange={(e) =>
                            handleOwnerChange(index, 'email', e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </form>
      </Form>

      <hr className="my-4 border-gray-300" />

      {owners.length < 4 && !isSignificantResponsibility && (
        <Button
          variant="default"
          className="mr-auto bg-[#81a2c8] text-white"
          onClick={addNewOwner}
        >
          Add New Owner
        </Button>
      )}
    </div>
  )
}
