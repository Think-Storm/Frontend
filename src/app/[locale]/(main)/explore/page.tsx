'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import iconSearch from '../../../../../public/images/iconSearch.png'
import FilterSelect from '@/components/ui/FilterSelect'
import { FILTERS } from '@/lib/constants/common'
import ProjectCard from '@/components/ui/ProjectCard'
import Navbar from '@/components/ui/Navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useFetchInfiniteProjects,
  useFetchProjects,
  useOutsideClick,
} from '@/store/hooks'
import BackgroundHeader from '@/components/ui/BackroundHeader'
import bgExplore from '../../../../../public/images/bg-explore.png'
import { useInView } from 'react-intersection-observer'
import InfiniteScrollSpin from '@/components/ui/InfiniteScrollSpin'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ExplorePage() {
  // const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const limit = 9

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchInfiniteProjects()

  const allProjects = data?.pages.flatMap((page) => page.projects) || []

  return (
    <div className="flex w-full relative items-center justify-center ">
      <BackgroundHeader bgImage={bgExplore.src}>
        {/* Navbar */}
        <Navbar />
        <Image
          src="/images/bg-explore.png"
          alt="Header Background"
          width={1440}
          height={384}
          className="w-full -z-10 object-cover absolute top-0 left-0 mt-[74px]"
        />

        {/* Header and Filters Section */}

        <div className="flex flex-col w-full  items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className=" w-full ">
            <div className="flex pt-10">
              <h1 className="text-3xl font-semibold mb-10">Explore</h1>
            </div>
            <div className="flex flex-col gap-4">
              {/* Search Bar & sort by filter*/}
              <div className="flex flex-row justify-between">
                <div className="relative 2-full flex-1 ">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[19px] h-[19px] pointer-events-none" />
                  <Input
                    type="search"
                    id="search"
                    placeholder="Search"
                    className="pl-10 h-[48px] max-w-[524px]"
                  />
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

              {/* filters */}
              <div className="flex justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-6 h-[48px] ">
                {FILTERS.slice(0, 4).map((filter, index) => (
                  <FilterSelect
                    key={index}
                    placeholder={filter.placeholder}
                    options={filter.options}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Projects & pagination container */}
          <div className="">
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
        </div>
      </BackgroundHeader>
    </div>
  )
}
