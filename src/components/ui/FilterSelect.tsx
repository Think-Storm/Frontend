import React, { ComponentType, FC } from 'react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { cn } from '@/utils/common'
import { Check, X } from 'lucide-react'
import {
  TechnicalLabel,
  DomainLabel,
  LanguageName,
  Goal,
} from '@think-storm/contracts'

const formatLabel = (text: string): string => {
  const formatted = text.replace(/([A-Z])/g, ' $1').trim()
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const technicalLabelOptions = Object.entries(TechnicalLabel)
  .map(([label, value]) => ({
    label: formatLabel(label),
    value: String(value),
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

export const domainLabelOptions = Object.entries(DomainLabel)
  .map(([key, value]) => ({
    label: formatLabel(key),
    value: String(value),
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

export const goalLabelOptions = Object.entries(Goal)
  .map(([key, value]) => ({
    label: formatLabel(key),
    value: key,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

export const languageLabelOptions = Object.values(LanguageName)
  .map((value) => ({
    label: value,
    value: value,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

interface FilterSelectProps {
  placeholder: string
  icon?: ComponentType<{ size?: string | number; className?: string }>
  options: { label: string; value: string }[]
  className?: string
  width?: string
  onValueChange?: (value: string) => void
  onReset?: () => void
  value?: string | string[]
  isMultiSelect?: boolean
}

const FilterSelect: FC<FilterSelectProps> = ({
  placeholder,
  icon: Icon,
  options,
  className = '',
  width,
  onValueChange,
  onReset,
  value = [],
  isMultiSelect = false,
}) => {
  const selectedValues = Array.isArray(value) ? value : value ? [value] : []
  const selectedCount = selectedValues.length

  const getDisplayText = () => {
    if (selectedCount === 0) return placeholder
    if (selectedCount === 1) {
      const selectedOption = options.find((opt) =>
        selectedValues.includes(opt.value),
      )
      return selectedOption?.label || placeholder
    }
    return `${selectedCount} selected`
  }

  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === '__reset__') return

    if (onValueChange) {
      onValueChange(selectedValue)
    }
  }

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onReset) {
      onReset()
    }
  }

  return (
    <Select onValueChange={handleValueChange} value="">
      <SelectTrigger
        style={{ width: width || '212px' }}
        className={cn('h-full flex items-center', className)}
      >
        <span className="flex items-center gap-1">
          {Icon && <Icon size={16} className="text-gray-400" />}
          <span
            className={cn(
              selectedCount > 0 ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            {getDisplayText()}
          </span>
        </span>
      </SelectTrigger>
      <SelectContent className="border-gray-300">
        {selectedCount > 0 && onReset && (
          <button
            onClick={handleReset}
            className="flex flex-row text-gray-400 items-center p-1 gap-2 hover:bg-gray-100 transition-colors w-full"
            aria-label="Clear filter"
          >
            <X size={12} className="text-gray-400 hover:text-gray-600" />
            Reset all filters
          </button>
        )}
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value)

          return (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                {isMultiSelect && isSelected && (
                  <Check size={16} className="text-gray-600 ml-2" />
                )}
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default FilterSelect
