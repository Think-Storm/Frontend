// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// export type FilterState = {
//   technical: string
//   domain: string
//   purpose: string
//   language: string
//   sortBy: 'recent' | 'popular'
// }

// const initialState: FilterState = {
//   technical: '',
//   domain: '',
//   purpose: '',
//   language: '',
//   sortBy: 'recent',
// }

// export const filterSlice = createSlice({
//   name: 'filters',
//   initialState,
//   reducers: {
//     setFilter: (
//       state,
//       action: PayloadAction<{ key: keyof FilterState; value: string }>,
//     ) => {
//       const { key, value } = action.payload
//       if (key === 'sortBy') {
//         state[key] =
//           value === 'recent' || value === 'popular' ? value : 'recent'
//       } else {
//         state[key] = value as string
//       }
//     },
//     resetFilters: () => initialState,
//   },
// })

// export const { setFilter, resetFilters } = filterSlice.actions

// export default filterSlice.reducer
