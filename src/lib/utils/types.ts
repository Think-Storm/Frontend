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