import { useFetchInfiniteProjects } from '@/store/hooks'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import type { InfiniteScrollSpinProps } from '@/lib/utils/types'

const InfiniteScrollSpin = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  className = '',
}: InfiniteScrollSpinProps) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  return (
    <div ref={ref} className="flex justify-center p-4">
      {isFetchingNextPage && (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      )}
    </div>
  )
}

export default InfiniteScrollSpin
