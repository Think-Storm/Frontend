'use client'

import { TechStack } from '@/lib/utils/types'
import { Button } from '../../../ui/button'
import { Input } from '../../../ui/input'
import { Label } from '../../../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'
import { TechStackInput } from './TechStackInput'
import { Textarea } from '../../../ui/textarea'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ProjectDetailsForm = () => {
  const router = useRouter()
  const [selectedTechs, setSelectedTechs] = useState<TechStack[]>([])
  const handleTechSelect = (tech: TechStack) => {
    if (!selectedTechs.find((t) => t.id === tech.id)) {
      setSelectedTechs([...selectedTechs, tech])
    }
  }
  const handleTechRemove = (techId: number) => {
    setSelectedTechs(selectedTechs.filter((tech) => tech.id !== techId))
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-8 w-[768px] h-[843px] pt-8">
        <div className="flex">
          <h1 className="text-2xl font-semibold ">Project Details</h1>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="project name">Project Name *</Label>
          <Input
            type="project name"
            id="project name"
            placeholder="Project name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Description"
            className="min-h-[168px] resize-none"
          />
        </div>

        <div className="flex flex-row justify-between gap-8">
          <div className="flex-1 flex flex-col gap-2 ">
            <Label htmlFor="purpose">Purpose *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 flex flex-col gap-2 ">
            <Label htmlFor="language">Language *</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="skills">Skills *</Label>
          <TechStackInput
            selectedTechs={selectedTechs}
            onSelect={handleTechSelect}
            onRemove={handleTechRemove}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="techstack">Tech Stack *</Label>
          <TechStackInput
            selectedTechs={selectedTechs}
            onSelect={handleTechSelect}
            onRemove={handleTechRemove}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="field">Field *</Label>
          <TechStackInput
            selectedTechs={selectedTechs}
            onSelect={handleTechSelect}
            onRemove={handleTechRemove}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="reset"
            className="bg-gray-200 text-black hover:bg-gray-300"
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            onClick={() => {
              router.push('/project-created')
            }}
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsForm
