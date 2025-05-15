'use  client'

import React, { useState } from 'react'
import { TProjects } from '@/lib/utils/types'
import { useFetchProjects } from '@/store/hooks'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from './menubar'

const ProjectCard = () => {
  const { data: projects = [], isLoading, error } = useFetchProjects()

  if (isLoading) {
    return <div>Loading projects...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
      {projects.map((project, index) => (
        <div key={index} className="p-4 border rounded-md shadow-md">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm font-semibold bg-gray-200 p-1 rounded">
              {project.goal}
            </span>
            <Menubar className="w-[40px]">
              <MenubarMenu>
                <MenubarTrigger>...</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>View requests</MenubarItem>
                  <MenubarItem>Edit project</MenubarItem>
                  <MenubarItem>Delete</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          <h2 className="text-xl font-bold mt-2">{project.title}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {project.description || 'No description provided'}
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
