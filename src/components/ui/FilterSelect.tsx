import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface FilterSelectProps {
  placeholder: string
  options: { label: string; value: string }[]
  className?: string
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  placeholder,
  options,
  className = '',
}) => {
  return (
    <Select>
      <SelectTrigger className="w-[212px] h-full min-h-[48px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="border-gray-300">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterSelect
