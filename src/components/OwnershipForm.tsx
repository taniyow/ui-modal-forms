'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { LucideCalendarDays } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { formatSSN } from './helpers'

import { cn } from '@/lib/utils'

import { PhoneNumberInput } from '@/components/custom/phone-input'
import { Stepper } from '@/components/custom/stepper'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string(),
  title: z.string().min(1, 'Title/Position is required'),
  ownershipPercentage: z
    .string()
    .min(1, 'Ownership % is required')
    .regex(/^\d+$/, 'Must be a valid percentage'),
  phoneNumber: z.string().min(1, 'Phone Number is required'),
  address: z.string().min(1, 'Address is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Zip Code is required'),
  ssn: z.string().min(1, 'SSN is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  email: z.string().min(1, 'Email Address is required'),
})

type FormData = z.infer<typeof formSchema>

export default function OwnershipForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      ownershipPercentage: '',
      phoneNumber: '',
      address: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      ssn: '',
      dateOfBirth: '',
      email: '',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="font-bold">
            Create Merchant
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[80%] md:max-w-[70%] px-16 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <Stepper />
              <hr className="my-4 border-gray-300" />
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              <p className="my-4">
                Provide the following information for each individual who owns,
                directly or indirectly, 25 % or more of the equity interest of
                your business. If no single owner owns more than 25%, an
                individual with significant responsibility can be added as
                principal 1*.
              </p>
              <p className="my-4">
                *Individual with significant responsibility includes an
                executive officer or owner with authority to control, manage,
                and direct the legal entity (e.g. a Chief Executive Officer,
                Chief Financial Officer, Managing Member, General Partner,
                President, Vice President, or Treasurer) or any individual with
                authority to perform such functions.{' '}
              </p>
              <div className="flex items-center space-x-2 hover:cursor-pointer">
                <Checkbox id="significantResponsibility" />
                <label
                  htmlFor="significantResponsibility"
                  className="text-base text-gray-800 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Is an individual with significant responsibility
                </label>
              </div>
            </DialogDescription>
          </DialogHeader>
          <hr className="my-4 border-gray-300" />
          <h2 className="text-lg font-semibold mb-4">OWNER 1</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        First Name:<span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
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
                        <Input placeholder="Last Name" {...field} />
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
                        <Input placeholder="Title / Position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownershipPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Ownership %:<span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ownership" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <Input placeholder="Home Address" {...field} />
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
                        Country:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                          </FormControl>
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
                        State:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                          </FormControl>
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
                        City:
                        <span className="text-red-500 mx-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                          </FormControl>
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
                        <Input placeholder="Enter Zip Code" {...field} />
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
                          value={formatSSN(field.value)}
                          onChange={(e) =>
                            field.onChange(formatSSN(e.target.value))
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
                              onSelect={(date: { toISOString: () => any }) =>
                                field.onChange(date?.toISOString() ?? '')
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
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button variant="outline" className="mb-4">
                Add New Owner
              </Button>

              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline">Previous</Button>
                  <Button type="submit">Next</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
