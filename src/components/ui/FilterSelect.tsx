import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface FilterSelectProps {
  placeholder: string;
  options: { label: string; value: string }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({ placeholder, options }) => {
  return (
    <Select>
      <SelectTrigger className="w-[254px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
