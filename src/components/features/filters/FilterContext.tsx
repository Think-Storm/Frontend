'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import useDebounce from '../search/hooks/useDebounce'

type FilterState = {
  search: string
  technical: string[]
  domain: string[]
  goal: string
  languageName: string
}

type FilterContextType = {
  uiFilters: FilterState
  setUiFilters: Dispatch<SetStateAction<FilterState>>
  setSearch: (search: string) => void
  debouncedFilters: FilterState
  updateTechnical: (value: string) => void
  updateDomain: (value: string) => void
  updateGoal: (value: string) => void
  updateLanguage: (value: string) => void
  resetTechnical: () => void
  resetDomain: () => void
  resetGoal: () => void
  resetLanguage: () => void
  resetAllFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export default function FilterProvider({ children }: { children: ReactNode }) {
  const [uiFilters, setUiFilters] = useState<FilterState>({
    search: '',
    technical: [],
    domain: [],
    goal: '',
    languageName: '',
  })

  const debouncedFilters = useDebounce(uiFilters, 500)

  const setSearch = (search: string) => {
    setUiFilters((prev) => ({ ...prev, search }))
  }

  const updateTechnical = (value: string) => {
    setUiFilters((prev) => {
      const exists = prev.technical.includes(value)

      return {
        ...prev,
        technical: exists
          ? prev.technical.filter((v) => v !== value)
          : [...prev.technical, value],
      }
    })
  }

  const updateDomain = (value: string) => {
    setUiFilters((prev) => {
      const exists = prev.domain.includes(value)

      return {
        ...prev,
        domain: exists
          ? prev.domain.filter((v) => v !== value)
          : [...prev.domain, value],
      }
    })
  }

  const updateGoal = (goal: string) => {
    setUiFilters((prev) => ({ ...prev, goal }))
  }

  const updateLanguage = (languageName: string) => {
    setUiFilters((prev) => ({ ...prev, languageName }))
  }

  const resetTechnical = () => {
    setUiFilters((prev) => ({ ...prev, technical: [] }))
  }

  const resetDomain = () => {
    setUiFilters((prev) => ({ ...prev, domain: [] }))
  }

  const resetGoal = () => {
    setUiFilters((prev) => ({ ...prev, goal: '' }))
  }

  const resetLanguage = () => {
    setUiFilters((prev) => ({ ...prev, languageName: '' }))
  }

  const resetAllFilters = () => {
    setUiFilters({
      search: '',
      technical: [],
      domain: [],
      goal: '',
      languageName: '',
    })
  }
  return (
    <FilterContext.Provider
      value={{
        uiFilters,
        setUiFilters,
        setSearch,
        debouncedFilters,
        updateTechnical,
        updateDomain,
        updateGoal,
        updateLanguage,
        resetTechnical,
        resetDomain,
        resetGoal,
        resetLanguage,
        resetAllFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilters must be used within a Filter Provider')
  }
  return context
}
