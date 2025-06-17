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
import { useState, useEffect } from 'react'
import {
  useFetchInfiniteProjects,
  useFetchProjects,
  useOutsideClick,
} from '@/store/hooks'
import ProjectCard from '@/components/ui/ProjectCard'
import BackgroundHeader from '@/components/ui/BackgroundHeader'
import bgExplore from '../../../../../public/images/bg-explore.png'
import { useInView } from 'react-intersection-observer'
import InfiniteScrollSpin from '@/components/ui/InfiniteScrollSpin'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'

const projectFilters = ['Created', 'Saved', 'Joined', 'Requested']

export default function MyProjectPage() {
  const router = useRouter()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchInfiniteProjects()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    setActiveFilter(null)
  })

  const [page, setPage] = useState(1)
  const limit = 9
  const allProjects = data?.pages.flatMap((page) => page.projects) || []

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
            <button
              className="rounded-md bg-black text-white w-[164px] h-[48px] hover:bg-gray-800 active:bg-gray-700 transition-colors"
              onClick={() => router.push('/create-project')}
            >
              + Create project
            </button>
          </div>
          {/* filters container */}
          <div className="flex items-center justify-between h-full ">
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
            <div className="flex flex-1 flex-row justify-end items-center gap-2 h-[48px]">
              <Label>Sort by:</Label>
              <Select>
                <SelectTrigger className="w-[113px] h-full min-h-[48px]">
                  <SelectValue placeholder="Recent" />
                </SelectTrigger>
                <SelectContent className="border-gray-300 cursor-pointer ">
                  <SelectItem value="recent" className="cursor-pointer">
                    Recent
                  </SelectItem>
                  <SelectItem value="popular" className="cursor-pointer">
                    Popular
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Projects grid */}
          <ProjectCard
            projects={allProjects}
            isLoading={isLoading}
            error={error}
          />
          {/* Infinite scroll animation */}
          <InfiniteScrollSpin
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </BackgroundHeader>
    </div>
  )
}
