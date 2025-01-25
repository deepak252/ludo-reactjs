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
    connectSocket: (state, _: PayloadAction<{ reconnect?: boolean }>) => {
      state.connecting = true
      state.connected = false
    },
    connectSocketSuccess: (state) => {
      state.connecting = false
      state.connected = true
    },
    connectSocketFailure: (state) => {
      state.connecting = false
      state.connected = false
    },

    sendPing: () => {},
    sendPingSuccess: () => {},
    sendPingFailure: () => {},

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

  sendPing,
  sendPingSuccess,
  sendPingFailure,

  disconnectSocket,

  setSocketConnected,
  setSocketError,
} = socketSlice.actions
export default socketSlice.reducer
