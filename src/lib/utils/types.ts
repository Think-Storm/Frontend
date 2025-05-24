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

export type ProjectCardProps = {
  projects?: TProjects[]
  isLoading: boolean
  error: unknown
}

export interface BackgroundHeaderProps {
  bgImage: string
  height?: string // default to h-[384px]
  children?: React.ReactNode
}

export type TProjectsResponse = {
  projects: TProjects[]
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

// These types don't match the current API response but could be useful
// if needed for the application's internal data model
export type TTechnicalLabels = {
  name: string
}

export type TDomainLabels = {
  name: string
}

export type TUsersQuantity = {
  usersQuantity: number
}
