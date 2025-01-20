import { CreateRoomFormValues, ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MatchState } from './onlineMatch.types'
import { signOutSuccess } from '../auth/authSlice'

export type onlineMatchState = {
  room: {
    isLoading: boolean
    match?: MatchState
  }
  toastData?: ToastData | null
}

const initialState: onlineMatchState = {
  room: {
    isLoading: false,
  },
}

const onlineMatchSlice = createSlice({
  name: 'matchOnline',
  initialState,
  reducers: {
    createRoom: (state, _: PayloadAction<CreateRoomFormValues>) => {
      state.room.isLoading = true
    },
    createRoomSuccess: (state, action: PayloadAction<MatchState>) => {
      state.room.isLoading = false
      state.room.match = action.payload
    },
    createRoomFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.room.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload.message,
      }
    },

    setOnlineMatchToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
  },
  extraReducers: (builder) =>
    builder.addCase(signOutSuccess, () => initialState),
})

export const {
  createRoom,
  createRoomSuccess,
  createRoomFailure,

  setOnlineMatchToast,
} = onlineMatchSlice.actions

export default onlineMatchSlice.reducer
