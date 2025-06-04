import { X } from 'lucide-react'
import { TechStackInputProps, TechnicalLabel } from '../../lib/utils/types'
import { Popover, PopoverTrigger } from './popover'
import { Input } from './input'
import { PopoverContent } from '@radix-ui/react-popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command'
import { useTechStacks } from '@/store/hooks'
import { useState } from 'react'

export function TechStackInput({
  selectedTechs,
  onSelect,
  onRemove,
}: TechStackInputProps) {
  const { data: techStacks = [], isLoading } = useTechStacks()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  if (isLoading) {
    return <div>Loading tech stacks...</div>
  }
  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-wrap gap-2 p-2 border rounded-md">
            {selectedTechs?.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center-gap-1 px-2 py-1 bg-gray-100"
              >
                <span>{tech.labelName}</span>
                <X
                  className="w-4 h-4 cursor-pointer hover:text-red-500"
                  onClick={() => onRemove(tech.id)}
                />
              </div>
            ))}
            <Input
              type="text"
              placeholder="Search tech stacks..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 border-none focus:outline-none"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search tech stacks..." />
            <CommandEmpty>No tech stack found.</CommandEmpty>
            <CommandGroup>
              {techStacks.map((tech) => (
                <CommandItem
                  key={tech.id}
                  onSelect={() => {
                    onSelect(tech)
                    setOpen(false)
                    setValue('')
                  }}
                >
                  {tech.labelName}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
