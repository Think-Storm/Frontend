import React, { ComponentType } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { cn } from '@/utils/common'
import { TechnicalLabel, DomainLabel } from '@think-storm/contracts'

export const technicalLabelOptions = Object.entries(TechnicalLabel).map(
  ([label, value]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    value: String(value),
  }),
)

export const domainLabelOptions = Object.entries(DomainLabel).map(
  ([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: String(value),
  }),
)

interface FilterSelectProps {
  placeholder: string
  icon?: ComponentType<{ size?: string | number; className?: string }>
  options: { label: string; value: string }[]
  className?: string
  width?: string
  onValueChange?: (value: string) => void
  value?: string
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  placeholder,
  icon: Icon,
  options,
  className = '',
  width,
  onValueChange,
  value,
}) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger
        style={{ width: width || '212px' }}
        className={cn('h-full flex items-center', className)}
      >
        <span className="flex items-center gap-1">
          {Icon && <Icon size={16} className="text-gray-400" />}
          <SelectValue placeholder={placeholder} />
        </span>
      </SelectTrigger>
      <SelectContent className="border-gray-300">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            // className="cursor-pointer"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterSelect
