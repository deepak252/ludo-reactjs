import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SocketState {
  connected: boolean
  error: string | null
}

const initialState: SocketState = {
  connected: false,
  error: null,
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
    setSocketError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setSocketConnected, setSocketError } = socketSlice.actions
export default socketSlice.reducer
