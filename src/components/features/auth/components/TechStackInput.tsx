import { X } from 'lucide-react'
import { TechStackInputProps, TechStack } from '../../../../lib/utils/types'
import { Popover, PopoverTrigger } from '../../../ui/popover'
import { Input } from '../../../ui/input'
import { PopoverContent } from '@radix-ui/react-popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../../ui/command'
import { useTechStacks } from '@/store/hooks'
import { useState } from 'react'

export function TechStackInput({
  selectedTechs,
  onSelect,
  onRemove,
}: TechStackInputProps) {
  const { data: techStacks = [] as TechStack[], isLoading } = useTechStacks()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  if (isLoading) {
    return <div>Loading tech stacks...</div>
  }

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-wrap gap-2 border border-input rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            {selectedTechs?.map((tech) => (
              <div
                key={tech.id}
                className="flex flex-row justify-between py-0.5 px-1 items-center gap-1 bg-gray-200 rounded-sm border-none "
              >
                <span>{tech.labelName}</span>
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => onRemove(tech.id)}
                />
              </div>
            ))}
            <input
              type="text"
              placeholder="Search tech stacks..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 "
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
                  key={`${tech.id}-${tech.labelName}`}
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
