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
import { useFetchProjects, useOutsideClick } from '@/store/hooks'
import ProjectCard from '@/components/ui/ProjectCard'
import BackgroundHeader from '@/components/ui/BackroundHeader'
import bgExplore from '../../../../../public/images/bg-explore.png'

const projectFilters = ['Created', 'Saved', 'Joined', 'Requested']

export default function MyProjectPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    setActiveFilter(null)
  })
  const [page, setPage] = useState(1)
  const limit = 6
  const { data, isLoading, error } = useFetchProjects(page, limit )

  return (
    <div className="w-full relative">
      <BackgroundHeader bgImage={bgExplore.src}>
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col gap-10 mt-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 ">
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
          {/* <Skeleton className="w-[100px] h-[20px] rounded-full" /> */}
          <ProjectCard
            projects={data?.projects || []}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </BackgroundHeader>
    </div>
  )
}
