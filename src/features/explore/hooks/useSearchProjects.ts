import { useQuery } from '@tanstack/react-query'
import { SearchProject } from '@think-storm/contracts'
import { searchProjects } from '../api/projectsApi'

export function useSearchProjects(params: SearchProject) {
  return useQuery({
    queryKey: ['projects', 'search', params],
    queryFn: () => searchProjects(params),
    staleTime: 30_000,
  })
}
