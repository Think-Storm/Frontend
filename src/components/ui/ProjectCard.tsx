'use  client'

import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from './menubar'
import ProjectCardSkeleton from './ProjectCardSkeleton'
import type { ProjectCardProps } from '@/lib/utils/types'
import StackIcon from 'tech-stack-icons'
import { goalIcons, type GoalType } from '@/lib/constants/common'

const ProjectCard = ({ projects = [], isLoading, error }: ProjectCardProps) => {
  const GoalIcon = (goal: string) => {
    const Icon = goalIcons[goal as GoalType] || goalIcons.Other
    return <Icon className="w-4 h-4 inline-block mr-1" />
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {[...Array(6)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    )
  }
  if (error) {
    return <div className="text-red-500">Error: {(error as Error).message}</div>
  }
  console.log('projectCard')
  console.log(projects)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
      {projects.map((project) => (
        <div
          key={project.id}
          className="p-4 bg-white border border-gray-200 rounded-md shadow-md"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <span className="flex flex-row items-center text-sm font-medium bg-gray-200 p-1 rounded">
                {GoalIcon(project.goal)}
                {project.goal}
              </span>
              <span className="flex flex-row items-center text-sm font-medium bg-gray-200 p-1 rounded">
                {project.languageName && <span>{project.languageName}</span>}
              </span>
            </div>

            <Menubar className="w-[40px] border border-gray-200">
              <MenubarMenu>
                <MenubarTrigger>...</MenubarTrigger>
                <MenubarContent className="border border-gray-200">
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
          {/* DOMAIN LABELS */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {project.domainLabels?.map((domain, i) => (
              <span
                key={`${project.id}-domain-${i}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {domain}
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {project.technicalLabels?.map((tech, i) => (
              <span
                key={`${project.id}-tech-${i}`}
                className="text-xs  px-2 py-1 rounded"
              >
                <StackIcon name={tech} className="w-[18px] h-[18px]" />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectCard
