import { TProjects } from './types'

const BASE_URL = 'http://localhost:3000'

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

type TProjectsResponse = {
  success: boolean
  data: TProjects[]
  message: string
}

export const getProjects = async (): Promise<TProjects[]> => {
  const res = await fetch(`${BASE_URL}/projects/search`)
  const data = await checkResponse<TProjectsResponse>(res)

  if (data.success) return data.data
  throw new Error(data.message || 'Failed to fetch projects')
}

export const getProjectById = async (id: number): Promise<TProjects> => {
  const res = await fetch(`${BASE_URL}/projects/${id}`)
  const data = await checkResponse<{
    success: boolean
    data: TProjects
    message: string
  }>(res)
  if (data.success) return data.data
  throw new Error(data.message || 'Failed to fetch projects')
}
