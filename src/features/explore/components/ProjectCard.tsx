'use client'

import { ProjectResponse, ProjectStatus, Goal } from '@think-storm/contracts'
import { Users, Calendar, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusStyles: Record<ProjectStatus, string> = {
  [ProjectStatus.Complete]: 'bg-green-100 text-green-700',
  [ProjectStatus.InProgress]: 'bg-blue-100 text-blue-700',
  [ProjectStatus.OnHold]: 'bg-yellow-100 text-yellow-700',
  [ProjectStatus.Canceled]: 'bg-red-100 text-red-700',
}

const goalStyles: Record<Goal, string> = {
  [Goal.Education]: 'bg-purple-100 text-purple-700',
  [Goal.Profitable]: 'bg-emerald-100 text-emerald-700',
  [Goal.Fun]: 'bg-orange-100 text-orange-700',
  [Goal.OpenSource]: 'bg-cyan-100 text-cyan-700',
}

const statusLabel: Record<ProjectStatus, string> = {
  [ProjectStatus.Complete]: 'Complete',
  [ProjectStatus.InProgress]: 'In Progress',
  [ProjectStatus.OnHold]: 'On Hold',
  [ProjectStatus.Canceled]: 'Canceled',
}

interface ProjectCardProps {
  project: ProjectResponse
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const visibleDomainLabels = project.domainLabels?.slice(0, 2) ?? []
  const visibleTechLabels = project.technicalLabels?.slice(0, 3) ?? []
  const extraDomain = (project.domainLabels?.length ?? 0) - visibleDomainLabels.length
  const extraTech = (project.technicalLabels?.length ?? 0) - visibleTechLabels.length

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {project.title}
        </h3>
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0',
            statusStyles[project.status],
          )}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      {project.description && (
        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', goalStyles[project.goal])}>
          {project.goal}
        </span>
        {visibleDomainLabels.map((label) => (
          <span key={label} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {label}
          </span>
        ))}
        {visibleTechLabels.map((label) => (
          <span key={label} className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
            {label}
          </span>
        ))}
        {(extraDomain > 0 || extraTech > 0) && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
            +{extraDomain + extraTech} more
          </span>
        )}
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {project.users.length} member{project.users.length !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            {project.languageName}
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formattedDate}
        </span>
      </div>
    </div>
  )
}
