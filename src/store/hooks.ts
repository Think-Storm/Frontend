import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'
import { useEffect, useRef } from 'react'
import { getProjects } from '@/lib/utils/thinkstorm-api'
import type { TProjects } from '../lib/utils/types'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])
  return ref
}

export function useFetchProjects(page = 1, limit = 9) {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => getProjects(page, limit),
    staleTime: 1000 * 60 * 15,

  })
}
