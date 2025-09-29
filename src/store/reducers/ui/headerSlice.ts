import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HeaderState {
  isWhite: boolean
  isHidden: boolean
}

const initialState: HeaderState = {
  isWhite: false,
  isHidden: true,
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setIsWhite: (state, action: PayloadAction<boolean>) => {
      state.isWhite = action.payload
    },
    setIsHidden: (state, action: PayloadAction<boolean>) => {
      state.isHidden = action.payload
    },
  },
})

export const { setIsWhite, setIsHidden } = headerSlice.actions

export default headerSlice.reducer
