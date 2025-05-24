import { TProjects, TProjectsResponse, TProjectsResponseTest } from './types'
import { BASE_API_URL } from '../constants/common'

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

export const getProjects = async (
  page = 1,
  limit = 9,
): Promise<TProjectsResponseTest> => {
  try {
    const url = new URL(`${BASE_API_URL}/projects/search`)
    url.searchParams.append('page', page.toString())
    url.searchParams.append('limit', limit.toString())

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
