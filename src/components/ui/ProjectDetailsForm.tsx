"use client"

import { TechStack } from '@/lib/utils/types'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import { TechStackInput } from './TechStackInput'
import { Textarea } from './textarea'
import { useState } from 'react'

const ProjectDetailsForm = () => {
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
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="techstack">Tech Stack *</Label>
          <TechStackInput
            selectedTechs={selectedTechs}
            onSelect={handleTechSelect}
            onRemove={handleTechRemove}
          />
          <Input type="tech stack" id="tech stack" placeholder="Tech stack" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="field">Field *</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="reset"
            className="bg-gray-200 text-black hover:bg-gray-300"
          >
            Save as Draft
          </Button>
          <Button type="submit">Create Project</Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsForm
