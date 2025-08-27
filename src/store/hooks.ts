import { useDispatch, useSelector, useStore } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getProjects } from '@/lib/utils/thinkstorm-api'
import { useQuery } from '@tanstack/react-query'
import { AppDispatch, AppStore, RootState } from '.'
import { BASE_API_URL } from '@/lib/constants/common'
import { TechStack } from '@/lib/utils/types'

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

const getTechStacks = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/tech-stacks`)

    if (!response.ok) {
      throw new Error(`Error fetching tech stacks`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Faileed to fetch tech stacks')
    throw error
  }
}

export function useFetchProjects(page = 1, limit = 9) {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => getProjects(page, limit),
    staleTime: 1000 * 60 * 15,
  })
}

export function useTechStacks() {
  return useQuery<TechStack[]>({
    queryKey: ['techStacks'],
    queryFn: getTechStacks,
    staleTime: 1000 * 60 * 5,
  })
}
