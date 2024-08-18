'use client'

import { Button } from '@/components/ui/button'

interface ReviewFormProps {
  ownershipData: {
    firstName: string
    lastName: string
    title: string
    ownershipPercentage: number
    phoneNumber: string
    address: string
    country: string
    state: string
    city: string
    zipCode: number
    ssn: string
    dateOfBirth: string
    email: string
  }[]
}

export default function ReviewForm({ ownershipData }: ReviewFormProps) {
  console.log(ownershipData)
  return (
    <div className="space-y-8 mb-6">
      {ownershipData.map((owner, index) => (
        <div
          key={index}
          className="flex flex-col p-4 border border-gray-300 rounded-lg mb-4"
        >
          <h2 className="text-lg font-semibold mb-4">{`Owner ${index + 1}`}</h2>
          <p>
            <strong>First Name:</strong> {owner.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {owner.lastName}
          </p>
          <p>
            <strong>Title / Position:</strong> {owner.title}
          </p>
          <p>
            <strong>Ownership Percentage:</strong> {owner.ownershipPercentage}%
          </p>
          <p>
            <strong>Phone Number:</strong> {owner.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {owner.address}
          </p>
          <p>
            <strong>Country:</strong> {owner.country}
          </p>
          <p>
            <strong>State:</strong> {owner.state}
          </p>
          <p>
            <strong>City:</strong> {owner.city}
          </p>
          <p>
            <strong>Zip Code:</strong> {owner.zipCode}
          </p>
          <p>
            <strong>SSN:</strong> {owner.ssn}
          </p>
          <p>
            <strong>Date of Birth:</strong> {owner.dateOfBirth}
          </p>
          <p>
            <strong>Email:</strong> {owner.email}
          </p>
        </div>
      ))}
    </div>
  )
}
