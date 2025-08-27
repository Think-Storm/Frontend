import { getProjects } from '@/lib/utils/thinkstorm-api'
import { useInfiniteQuery } from '@tanstack/react-query'
import { LanguageName, SearchProjectResponse } from '@think-storm/contracts'

type UseFetchInfiniteProjectsParams = {
  search?: string
  technical?: string[]
  domain?: string[]
  goal?: string
  languageName?: string
}

const PAGE_SIZE = 10

const useFetchInfiniteProjects = ({
  search,
  technical,
  domain,
  goal,
  languageName,
}: UseFetchInfiniteProjectsParams = {}) => {
  const filterParams = {
    search: search || undefined,
    technical: technical || undefined,
    domain: domain || undefined,
    goal: goal || undefined,
    languageName: languageName || undefined,
  }

  const queryKey = [
    'infiniteProjects',
    ...Object.entries(filterParams)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}:${value}`),
  ]
  return useInfiniteQuery<SearchProjectResponse, Error>({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      getProjects(
        pageParam as number,
        PAGE_SIZE,
        search,
        technical,
        domain,
        goal,
        languageName as LanguageName,
      ),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Cache persists for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch when component mounts if data exists
    refetchOnReconnect: false,

    retry: (failureCount, error) => {
      // Don't retry on 404s (not found)
      if (error instanceof Error && error.message.includes('404')) {
        return false
      }

      // Retry up to 3 times
      return failureCount < 3
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export default useFetchInfiniteProjects
