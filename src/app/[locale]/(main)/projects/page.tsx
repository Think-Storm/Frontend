'use client'

import { Button } from '@/components/ui/button'
import Navbar from '@/components/ui/Navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useOutsideClick } from '@/store/hooks'
import { useFetchProjects } from '../../../../store/hooks'
import ProjectCard from '@/components/ui/ProjectCard'
import { Skeleton } from '@/components/ui/skeleton'

const projectFilters = ['Created', 'Saved', 'Joined', 'Requested']

export default function MyProjectPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    setActiveFilter(null)
  })
  const mockProjects = [
    {
      id: '1',
      title: 'Mock Project One',
      description: 'This is a mock project for layout testing.',
      status: 'Created',
      goal: 'Collaboration',
      technicalLabels: [
        { labelName: 'React' },
        { labelName: 'TypeScript' },
        { labelName: 'Tailwind CSS' },
      ],
    },
    {
      id: '2',
      title: 'Mock Project Two',
      description: 'Another sample project to visualize layout.',
      status: 'Saved',
      goal: 'Learning',
      technicalLabels: [{ labelName: 'Next.js' }],
    },
  ]
  const useMock = true

  const {
    data: projects,
    isLoading,
    error,
  } = useMock
    ? { data: mockProjects, isLoading: false, error: null }
    : useFetchProjects()

  const displayProjects = projects

  if (isLoading)
    return <div className="p-8 text-center">Loading projects...</div>
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Error: {error.message}</div>
    )

  return (
    <div className="w-full relative">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col gap-[40px] mx-[188px] mt-[74px] ">
        {/* header and button container */}
        <div className="flex flex-row items-center justify-between ">
          <h1 className="text-3xl font-semibold">My Projects</h1>
          <button className="rounded-md bg-black text-white w-[164px] h-[48px]">
            + Create project
          </button>
        </div>
        {/* filters container */}
        <div className="flex items-center justify-between h-full  ">
          <div
            className="flex flex-wrap sm:flex-row gap-2 text-black"
            ref={containerRef}
          >
            {projectFilters.map((label) => (
              <Button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`h-[48px] ${
                  activeFilter === label
                    ? 'bg-[#eee] text-black hover:bg-[#eee] hover:text-black'
                    : 'bg-transparent text-black border-none hover:bg-[#eee] hover:text-black'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap sm:flex-row  items-center gap-2 h-[48px] ">
            <div className="text-sm font-bold ">Sort by:</div>
            <div className="h-full ">
              <Select>
                <SelectTrigger className="w-[113px]">
                  <SelectValue placeholder="Recent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* Projects grid */}
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <ProjectCard />
      </div>
    </div>
  )
}
