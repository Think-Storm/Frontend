import {
  TechnicalLabel,
  TechStack,
  TProjects,
  TProjectsResponse,
  TProjectsResponseTest,
} from './types'
import { BASE_API_URL } from '../constants/common'

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// const fetchWithRetry = async (
//   url: string,
//   options: RequestInit,
//   retries: 3,
//   baseDelay = 1000,
// ): Promise<Response> => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       const res = await fetch(url, options)

//       if (res.status !== 429) return res

//       const retryAfter = res.headers.get('Retry-After')
//       const waitTime = retryAfter
//         ? parseInt(retryAfter) * 1000
//         : baseDelay * Math.pow(2, i)

//       console.warn(`Rate limited, retrying after ${waitTime}ms...`)
//       await delay(waitTime)
//     } catch (error) {
//       if (i === retries - 1) throw error
//     }
//   }
//   throw new Error('Max retries reached')
// }

export const getProjects = async (
  page = 1,
  limit = 9,
  search?: string,
  technical?: string,
  domain?: string,
): Promise<TProjectsResponseTest> => {
  try {
    const url = new URL(`${BASE_API_URL}/projects/search`)
    url.searchParams.append('page', page.toString())
    url.searchParams.append('limit', limit.toString())
    if (search) url.searchParams.append('search', search)

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (res.status === 204) {
      return {
        projects: [],
        page,
        limit,
        totalPages: 0,
        totalItems: 0,
      }
    }

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`)
    }
    const json = await res.json()

    if (
      !json ||
      !Array.isArray(json.projects) ||
      typeof json.page !== 'number' ||
      typeof json.limit !== 'number' ||
      typeof json.totalPages !== 'number' ||
      typeof json.totalItems !== 'number'
    ) {
      throw new Error(
        'Invalid response format: expected projects array and pagination metadata',
      )
    }

    return json as TProjectsResponse
  } catch (error) {
    console.error(
      'Error fetching projects:',
      error instanceof Error ? error.message : 'Unknown error',
    )

    throw new Error('Failed to fetch projects. Please try again later.')
  }
}

export const getProjectById = async (id: number): Promise<TProjects> => {
  const res = await fetch(`${BASE_API_URL}/projects/${id}`)
  const data = await checkResponse<{
    success: boolean
    data: TProjects
    message: string
  }>(res)
  if (data.success) return data.data
  throw new Error(data.message || 'Failed to fetch projects')
}

export const getTechStacks = async (): Promise<TechStack[]> => {
  try {
    const projectsData = await getProjects(1, 100)

    const techStacksSet = new Set<string>()
    const techStacks: TechStack[] = []

    projectsData.projects.forEach((project) => {
      project.technicalLabels.forEach((label) => {
        if (!techStacksSet.has(label.labelName)) {
          techStacksSet.add(label.labelName)
          techStacks.push({
            id: label.projectId,
            labelName: label.labelName,
          })
        }
      })
    })
    return techStacks.sort((a, b) => a.labelName.localeCompare(b.labelName))
  } catch (error) {
    console.error('Error fetching tech stacks:', error)
    throw new Error('Failed to fetch tech stack')
  }
}
