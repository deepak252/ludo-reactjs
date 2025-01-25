import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TempState {
  count: number
}

const initialState: TempState = {
  count: 0,
}

const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },

    startTask: () => {},
  },
})

export const { setCount, startTask } = tempSlice.actions
export default tempSlice.reducer
