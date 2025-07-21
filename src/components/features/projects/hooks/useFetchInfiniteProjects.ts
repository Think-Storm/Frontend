import { getProjects } from '@/lib/utils/thinkstorm-api'
import { useInfiniteQuery } from '@tanstack/react-query'

type UseFetchInfiniteProjectsParams = {
  search?: string
  technical?: string
  domain?: string
}

const PAGE_SIZE = 9

const useFetchInfiniteProjects = ({
  search,
  technical,
  domain,
}: UseFetchInfiniteProjectsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['infiniteProjects', search, technical, domain],
    queryFn: ({ pageParam = 1 }) =>
      getProjects(pageParam, PAGE_SIZE, search, technical, domain),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
  })
}

export default useFetchInfiniteProjects
