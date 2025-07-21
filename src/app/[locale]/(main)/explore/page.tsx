'use client'

import React, { useState, useMemo } from 'react'
import FilterSelect, { domainLabelOptions } from '@/components/ui/FilterSelect'
import ProjectCard from '@/components/ui/ProjectCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import InfiniteScrollSpin from '@/components/ui/InfiniteScrollSpin'
import { Briefcase, Code, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { technicalLabelOptions } from '@/components/ui/FilterSelect'
import MyNavbar from '@/components/ui/MyNavbar'
import BackgroundImage from '@/components/ui/BackgroundImage'
import useDebounce from '@/components/features/search/hooks/useDebounce'
import useFetchInfiniteProjects from '@/components/features/projects/hooks/useFetchInfiniteProjects'

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent')
  const [filters, setFilters] = useState({
    technical: '',
    domain: '',
  })

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchInfiniteProjects({
    search: debouncedSearch,
    technical: filters.technical,
    domain: filters.domain,
  })

  const filteredProjects = useMemo(() => {
    const allProjects = data?.pages.flatMap((page) => page.projects) || []
    return allProjects.filter((project) => {
      // SEARCH INPUT FILTER
      if (
        (debouncedSearch &&
          !project.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())) ||
        (project.description &&
          project.description
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()))
      ) {
        return false
      }
      // TECHNICAL FILTER
      if (
        filters.technical &&
        !project.technicalLabels.some(
          (tech) => tech.labelName === filters.technical,
        )
      ) {
        return false
      }
      // DOMAIN FILTER
      if (
        filters.domain &&
        !project.domainLabels.some(
          (domain) => domain.labelName === filters.domain,
        )
      ) {
        return false
      }
      return true
    })
  }, [debouncedSearch, data?.pages, filters])

  return (
    <div className="flex w-full relative items-center justify-center ">
      <BackgroundImage bgImage="/images/bg-explore.png" height={''}>
        {/* Navbar */}
        <MyNavbar />
        {/* Header and Filters Section */}
        <div className="flex flex-col w-full  items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className=" w-full ">
            <div className="flex pt-10">
              <h1 className="text-3xl font-semibold mb-10">Explore</h1>
            </div>
            <div className="flex flex-col gap-4">
              {/* Search Bar & sort by filter*/}
              <div className=" hidden sm:flex flex-row justify-between">
                <div className="relative 2-full flex-1 ">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[19px] h-[19px] pointer-events-none" />
                  <Input
                    type="search"
                    id="search"
                    placeholder="Search"
                    className="pl-10 h-[48px] max-w-[524px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-1 flex-row justify-end items-center gap-2 h-[48px]">
                  <Label>Sort by:</Label>
                  <Select
                    value={sortBy}
                    onValueChange={(value) =>
                      setSortBy(value as 'recent' | 'popular')
                    }
                  >
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
              <div className="hidden sm:flex justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-6 h-[48px] ">
                <FilterSelect
                  placeholder="Technical Skills"
                  options={technicalLabelOptions}
                  value={filters.technical}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, technical: value }))
                  }
                  icon={Code}
                  className="min-h-[48px]"
                />
                <FilterSelect
                  placeholder="Domain"
                  icon={Briefcase}
                  options={domainLabelOptions}
                  value={filters.domain}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, domain: value }))
                  }
                  className="min-h-[48px]"
                />
              </div>
            </div>
          </div>
          {/* Projects & pagination container */}
          <div className="">
            <>
              <ProjectCard
                projects={filteredProjects}
                isLoading={isLoading}
                error={error}
              />
              {/* Infinite scroll animation */}
              <InfiniteScrollSpin
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            </>
          </div>
        </div>
      </BackgroundImage>
    </div>
  )
}
