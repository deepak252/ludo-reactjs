import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SocketState {
  connecting: boolean
  connected: boolean
  error: string | null
}

const initialState: SocketState = {
  connecting: false,
  connected: false,
  error: null,
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket: (state) => {
      state.connecting = true
    },
    connectSocketSuccess: (state) => {
      state.connecting = false
      state.connected = true
    },
    connectSocketFailure: (state) => {
      state.connecting = false
      state.connected = false
    },

    ping: () => {},
    pong: () => {},

    disconnectSocket: (state) => {
      state.connected = false
    },

    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload
    },
    setSocketError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  connectSocket,
  connectSocketSuccess,
  connectSocketFailure,

  ping,
  pong,

  disconnectSocket,

  setSocketConnected,
  setSocketError,
} = socketSlice.actions
export default socketSlice.reducer
