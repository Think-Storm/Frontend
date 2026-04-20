'use client'

import { useState, useEffect } from 'react'
import { ProjectStatus, Goal } from '@think-storm/contracts'
import { useSearchProjects } from './hooks/useSearchProjects'
import SearchBar from './components/SearchBar'
import FilterPanel from './components/FilterPanel'
import ProjectGrid from './components/ProjectGrid'

const PAGE_SIZE = 12

export default function ExploreFeature() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [status, setStatus] = useState<ProjectStatus | ''>('')
  const [goal, setGoal] = useState<Goal | ''>('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue)
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [inputValue])

  const queryParams = {
    ...(debouncedQuery ? { searchQuery: debouncedQuery } : {}),
    ...(status ? { status } : {}),
    ...(goal ? { goal } : {}),
    page,
    limit: PAGE_SIZE,
  }

  const { data, isLoading } = useSearchProjects(queryParams)

  const handleReset = () => {
    setInputValue('')
    setDebouncedQuery('')
    setStatus('')
    setGoal('')
    setPage(1)
  }

  const handleStatusChange = (newStatus: ProjectStatus | '') => {
    setStatus(newStatus)
    setPage(1)
  }

  const handleGoalChange = (newGoal: Goal | '') => {
    setGoal(newGoal)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Projects</h1>
          <p className="mt-1 text-gray-600">Discover and join projects from creators around the world</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={inputValue}
            onChange={setInputValue}
            className="flex-1"
          />
          <FilterPanel
            status={status}
            goal={goal}
            onStatusChange={handleStatusChange}
            onGoalChange={handleGoalChange}
            onReset={handleReset}
          />
        </div>

        <ProjectGrid
          projects={data?.projects ?? []}
          page={data?.page ?? page}
          totalPages={data?.totalPages ?? 1}
          totalItems={data?.totalItems ?? 0}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
