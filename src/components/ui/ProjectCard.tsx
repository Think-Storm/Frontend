'use  client'

import React, { useEffect, useState } from 'react'
import { PROJECTS } from '@/lib/constants/common'
import { TProjects } from '@/lib/utils/types'
import { getProjects } from '@/lib/utils/thinkstorm-api'
import { useQuery } from '@tanstack/react-query'

const ProjectCard = () => {
  // Dummy data for projects
  const [filter, setFilter] = useState('All')
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<TProjects[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  const filteredProjects = filter === 'All' ? projects: projects.filter((p) => p.type === filter)

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
            {project.type}
          </span>
          <h2 className="text-xl font-bold mt-2">{project.title}</h2>
          <p className="text-gray-500 text-sm mt-1">
            Lorem ipsum dolor sit amet...
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {project.skills.map((skill, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {skill}
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
