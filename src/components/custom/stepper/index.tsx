import { IoIosArrowForward } from 'react-icons/io'

export function Stepper() {
  return (
    <ol className="flex items-center w-full mb-4 space-x-2 text-sm font-medium text-center text-gray-700 bg-white sm:text-base">
      <li className="flex items-center uppercase">
        Business Info
        <IoIosArrowForward className="text-bold ms-2 sm:ms-4" />
      </li>
      <li className="flex items-center uppercase">
        Transactions
        <IoIosArrowForward className="text-bold ms-2 sm:ms-4" />
      </li>
      <li className="flex items-center uppercase text-blue-600 dark:text-blue-500">
        Ownership
        <IoIosArrowForward className="text-bold ms-2 sm:ms-4" />
      </li>
      <li className="flex items-center uppercase">
        Documents
        <IoIosArrowForward className="text-bold ms-2 sm:ms-4" />
      </li>
      <li className="flex items-center uppercase">
        Banking
        <IoIosArrowForward className="text-bold ms-2 sm:ms-4" />
      </li>
      <li className="flex items-center uppercase">
        Review
      </li>
    </ol>
  )
}
