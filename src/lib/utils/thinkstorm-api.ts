import { TProjects } from './types'

const BASE_URL = 'http://localhost:3001'

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

// type TProjectsResponse = {
//   success: boolean
//   data: TProjects[]
//   message: string
// }

export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/projects/search`, {
    headers: {
      'Accept': 'application/json'
    }
  })

  return await checkResponse<TProjects[]>(res);
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
