import { SearchProject, SearchProjectResponse } from '@think-storm/contracts'
import { api } from '@/lib/api/fetcher'
import { ROUTES } from '@/constants/routes'

export function searchProjects(params: SearchProject): Promise<SearchProjectResponse> {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  const query = searchParams.toString()
  const url = query
    ? `${ROUTES.API.PROTECTED.PROJECTS.SEARCH}?${query}`
    : ROUTES.API.PROTECTED.PROJECTS.SEARCH

  return api.get<SearchProjectResponse>(url)
}
