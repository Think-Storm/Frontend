'use client'

import React, { useState, useMemo, useEffect } from 'react'
import FilterSelect, {
  domainLabelOptions,
  goalLabelOptions,
  languageLabelOptions,
  technicalLabelOptions,
} from '@/components/ui/FilterSelect'
import ProjectCard from '@/components/ui/ProjectCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertCircle,
  Briefcase,
  Code,
  Goal,
  Languages,
  Search,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MyNavbar from '@/components/ui/MyNavbar'
import BackgroundImage from '@/components/ui/BackgroundImage'
import useDebounce from '@/components/features/search/hooks/useDebounce'
import useFetchInfiniteProjects from '@/components/features/projects/hooks/useFetchInfiniteProjects'
import { useFilters } from '@/components/features/filters/FilterContext'
import { useInView } from 'react-intersection-observer'
import InfiniteScrollSpin from '@/components/ui/InfiniteScrollSpin'

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent')
  const {
    uiFilters,
    setUiFilters,
    debouncedFilters,
    updateTechnical,
    updateDomain,
    resetTechnical,
    resetDomain,
    resetGoal,
    resetLanguage,
  } = useFilters()
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchInfiniteProjects({
    search: debouncedFilters.search,
    technical: debouncedFilters.technical,
    domain: debouncedFilters.domain,
    goal: debouncedFilters.goal,
    languageName: debouncedFilters.languageName,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const sortedProjects = useMemo(() => {
    const allProjects = data?.pages.flatMap((page) => page.projects) || []
    return [...allProjects].sort((a, b) => {
      if (sortBy === 'recent') {
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        )
      }
      return b.id - a.id
    })
  }, [data, sortBy])

  return (
    <div className="flex w-full relative items-center justify-center ">
      <BackgroundImage bgImage="/images/bg-explore.png" height={''}>
        <MyNavbar />
        <div className="flex flex-col w-full items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className=" w-full ">
            <div className="flex pt-10">
              <h1 className="text-3xl font-semibold mb-10">Explore</h1>
            </div>
            <div className="flex flex-col gap-4">
              {/* Search Bar & sort by filter */}
              <div className=" hidden sm:flex flex-row justify-between">
                <div className="relative 2-full flex-1 ">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[19px] h-[19px] pointer-events-none" />
                  <Input
                    type="search"
                    id="search"
                    placeholder="Search"
                    className="pl-10 h-[48px] max-w-[524px]"
                    value={uiFilters.search}
                    onChange={(e) =>
                      setUiFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
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
                  icon={Code}
                  options={technicalLabelOptions}
                  value={uiFilters.technical}
                  onValueChange={updateTechnical}
                  onReset={resetTechnical}
                  className="min-h-[48px]"
                  isMultiSelect={true}
                />
                <FilterSelect
                  placeholder="Field"
                  icon={Briefcase}
                  options={domainLabelOptions}
                  value={uiFilters.domain}
                  onValueChange={updateDomain}
                  onReset={resetDomain}
                  className="min-h-[48px]"
                  isMultiSelect={true}
                />
                <FilterSelect
                  placeholder="Purpose"
                  icon={Goal}
                  options={goalLabelOptions}
                  value={uiFilters.goal}
                  onValueChange={(value) =>
                    setUiFilters((prev) => ({ ...prev, goal: value }))
                  }
                  onReset={resetGoal}
                  className="min-h-[48px]"
                  isMultiSelect={false}
                />
                <FilterSelect
                  placeholder="Language"
                  icon={Languages}
                  options={languageLabelOptions}
                  value={uiFilters.languageName}
                  onValueChange={(value) =>
                    setUiFilters((prev) => ({ ...prev, languageName: value }))
                  }
                  onReset={resetLanguage}
                  className="min-h-[48px]"
                  isMultiSelect={false}
                />
              </div>
            </div>
          </div>
          <div className="">
            <>
              {!isLoading && sortedProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-lg text-gray-500 font-medium">
                    No projects found matching your filters.
                  </span>
                </div>
              )}
              <ProjectCard
                projects={sortedProjects}
                isLoading={isLoading}
                error={error}
              />
              {hasNextPage && (
                <div ref={ref} className="flex justify-center p-4">
                  <InfiniteScrollSpin
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                  />
                </div>
              )}
            </>
          </div>
        </div>
      </BackgroundImage>
    </div>
  )
}
