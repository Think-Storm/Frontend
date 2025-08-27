import { ProjectResponse } from '@think-storm/contracts'
import React from 'react'

export interface TProjectsResponseTest {
  projects: Array<{
    id: number
    title: string
    language: {
      code: string
      name: string
      createdAt: string
      lastUpdatedAt: string
    }
    technicalLabels: Array<{ projectId: number; labelName: string }>
    domainLabels: Array<{ projectId: number; labelName: string }>
    goalLabels: Array<{ projectId: number; labelName: string }>
    languageLabels: Array<{ projectId: number; labelName: string }>

    description: string
    status: string
    goal: string
    milestone: string
    users: Array<any>
    founder: {
      id: number
      email: string
      username: string
      fullName: string
      birthdate: string | null
      createdAt: string
      lastUpdatedAt: string
    }
    createdAt: string
    lastUpdatedAt: string
  }>
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

export type TProjects = {
  id: number
  title: string
  language: {
    code: string
    name: string
    createdAt: string
    lastUpdatedAt: string
  }
  technicalLabels: TechnicalLabel[]
  domainLabels: DomainLabel[]
  goalLabels: GoalLabel[]
  languageLabels: LanguageLabel[]
  description: string
  status: string // "InProgress", "Complete", "OnHold" (not boolean)
  goal: string
  milestone: string
  users: any[] // Empty array in the sample data
  founder: {
    id: number
    email: string
    username: string
    fullName: string
    birthdate: string | null
    createdAt: string
    lastUpdatedAt: string
  }
  createdAt: string
  lastUpdatedAt: string
}

export type TechnicalLabel = {
  projectId: number
  labelName: string
}

export type DomainLabel = {
  projectId: number
  labelName: string
}

export type GoalLabel = {
  projectId: number
  labelName: string
}

export type LanguageLabel = {
  projectId: number
  labelName: string
}

export type ProjectCardProps = {
  projects: ProjectResponse[]
  isLoading?: boolean
  error?: unknown
}

export interface BackgroundHeaderProps {
  bgImage: string
  children?: React.ReactNode
  height?: string
  className?: string
}

export type TProjectsResponse = {
  projects: TProjects[]
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

export type InfiniteScrollSpinProps = {
  hasNextPage?: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  onDataChange?: (projects: TProjects[]) => void
  className?: string
}

export type TechStack = {
  id: number
  // tech: TechStack[]
  techId: number
  labelName: string
}

export type TechStackInputProps = {
  selectedTechs: TechStack[]
  onSelect: (tech: TechStack) => void
  onRemove: (techId: number) => void
}
