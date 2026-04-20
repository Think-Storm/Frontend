'use client'

import { ProjectResponse } from '@think-storm/contracts'
import { ChevronLeft, ChevronRight, Frown } from 'lucide-react'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: ProjectResponse[]
  page: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  isLoading: boolean
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between gap-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-16 flex-shrink-0" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 bg-gray-100 rounded-full w-16" />
        <div className="h-5 bg-gray-100 rounded-full w-20" />
        <div className="h-5 bg-gray-100 rounded-full w-14" />
      </div>
      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between">
        <div className="h-3 bg-gray-100 rounded w-24" />
        <div className="h-3 bg-gray-100 rounded w-20" />
      </div>
    </div>
  )
}

export default function ProjectGrid({
  projects,
  page,
  totalPages,
  totalItems,
  onPageChange,
  isLoading,
}: ProjectGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <Frown className="w-10 h-10 text-gray-300" />
        <p className="text-gray-500 font-medium">No projects found</p>
        <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-gray-500">
        {totalItems.toLocaleString()} project{totalItems !== 1 ? 's' : ''} found
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
