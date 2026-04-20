'use client'

import { ProjectStatus, Goal } from '@think-storm/contracts'

interface FilterPanelProps {
  status: ProjectStatus | ''
  goal: Goal | ''
  onStatusChange: (status: ProjectStatus | '') => void
  onGoalChange: (goal: Goal | '') => void
  onReset: () => void
}

const statusOptions: { label: string; value: ProjectStatus | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'In Progress', value: ProjectStatus.InProgress },
  { label: 'Complete', value: ProjectStatus.Complete },
  { label: 'On Hold', value: ProjectStatus.OnHold },
  { label: 'Canceled', value: ProjectStatus.Canceled },
]

const goalOptions: { label: string; value: Goal | '' }[] = [
  { label: 'All Goals', value: '' },
  { label: 'Education', value: Goal.Education },
  { label: 'Open Source', value: Goal.OpenSource },
  { label: 'Profitable', value: Goal.Profitable },
  { label: 'Fun', value: Goal.Fun },
]

export default function FilterPanel({
  status,
  goal,
  onStatusChange,
  onGoalChange,
  onReset,
}: FilterPanelProps) {
  const hasActiveFilters = status !== '' || goal !== ''

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as ProjectStatus | '')}
        className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={goal}
        onChange={(e) => onGoalChange(e.target.value as Goal | '')}
        className="text-sm border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
      >
        {goalOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline underline-offset-2 transition-colors px-1"
        >
          Reset filters
        </button>
      )}
    </div>
  )
}
