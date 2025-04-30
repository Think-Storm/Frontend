'use  client'

import React, { useState } from 'react'
import { TProjects } from '@/lib/utils/types'
import { useFetchProjects } from '@/store/hooks'

const mockProjects: TProjects[] = [
  {
    id: 1,
    title: 'Mock Project One',
    language: {
      code: 'en',
      name: 'English',
      createdAt: '2025-01-01',
      lastUpdatedAt: '2025-04-01',
    },
    technicalLabels: [
      { projectId: 1, labelName: 'React' },
      { projectId: 1, labelName: 'TypeScript' },
    ],
    domainLabels: [],
    description: 'This is a mock project for layout testing.',
    status: 'InProgress',
    goal: 'Collaboration',
    milestone: 'Initial Phase',
    users: [],
    founder: {
      id: 1,
      email: 'founder@example.com',
      username: 'founder',
      fullName: 'Founder Name',
      birthdate: '1990-01-01',
      createdAt: '2025-01-01',
      lastUpdatedAt: '2025-01-01',
    },
    createdAt: '2025-01-01',
    lastUpdatedAt: '2025-01-01',
  },
  {
    id: 2,
    title: 'Mock Project Two',
    language: {
      code: 'ko',
      name: 'Korean',
      createdAt: '2025-02-01',
      lastUpdatedAt: '2025-04-01',
    },
    technicalLabels: [
      { projectId: 2, labelName: 'Next.js' },
      { projectId: 2, labelName: 'Tailwind CSS' },
    ],
    domainLabels: [],
    description: 'Another mock project to visualize layout.',
    status: 'Complete',
    goal: 'Learning',
    milestone: 'Final Phase',
    users: [],
    founder: {
      id: 2,
      email: 'founder2@example.com',
      username: 'founder2',
      fullName: 'Founder Name 2',
      birthdate: '1985-05-01',
      createdAt: '2025-02-01',
      lastUpdatedAt: '2025-02-01',
    },
    createdAt: '2025-02-01',
    lastUpdatedAt: '2025-02-01',
  },
]

const ProjectCard = () => {
  // Dummy data for projects
  const [filter, setFilter] = useState<
    'All' | 'InProgress' | 'Complete' | 'OnHold'
  >('All')
  const { data: projects = [], isLoading, error } = useFetchProjects()

  const displayedProjects = isLoading || error ? mockProjects : projects

  const filteredProjects =
    filter === 'All' ? displayedProjects : displayedProjects.filter((p) => p.status === filter)

  if (isLoading) {
    return <div>Loading projects...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {filteredProjects.map((project, index) => (
        <div key={index} className="p-4 border rounded-md shadow-md">
          <span className="text-sm font-semibold bg-gray-200 p-1 rounded">
            {project.status}
          </span>
          <h2 className="text-xl font-bold mt-2">{project.title}</h2>
          <p className="text-gray-500 text-sm mt-1">
            Lorem ipsum dolor sit amet...
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {project.technicalLabels.map((tech, i) => (
              <span
                key={`${project.id}-tech-${i}`}
                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
              >
                {tech.labelName}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectCard
function fetchData() {
  throw new Error('Function not implemented.')
}
