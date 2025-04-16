import { TProjects } from './types'

const BASE_URL = 'https://ts-backend.fly.dev/api-docs'
const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

type TProjectsResponse = {
  success: boolean
  data: TProjects[]
  message: string
}

export const getProjects = async (): Promise<TProjects[]> => {
  const res = await fetch(`${BASE_URL}/projects`)
  const data = await checkResponse<TProjectsResponse>(res)

  if (data.success) return data.data
  throw new Error(data.message || 'Failed to fetch projects')
}
