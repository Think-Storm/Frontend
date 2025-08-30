import { useCallback } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { setIsWhite, setIsHidden } from '@/store/ui/headerSlice'

export default function useHeaderVisibility() {
  const dispatch = useAppDispatch()
  const changeHeaderWhite = useCallback(
    (value: boolean) => {
      dispatch(setIsWhite(value))
    },
    [dispatch],
  )

  const changeHeaderHidden = useCallback(
    (value: boolean) => {
      dispatch(setIsHidden(value))
    },
    [dispatch],
  )

  return {
    changeHeaderWhite,
    changeHeaderHidden,
  }
}
