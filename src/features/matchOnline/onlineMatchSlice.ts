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
    createMatch: (state, _: PayloadAction<CreateRoomFormValues>) => {
      state.room.isLoading = true
    },
    createMatchSuccess: (state, action: PayloadAction<MatchState>) => {
      state.room.isLoading = false
      state.room.match = action.payload
    },
    createMatchFailure: (state, action) => {
      state.room.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    joinMatch: (state, _: PayloadAction<{ roomId: string }>) => {
      state.room.isLoading = true
    },
    joinMatchSuccess: (state, action: PayloadAction<MatchState>) => {
      state.room.isLoading = false
      state.room.match = action.payload
    },
    joinMatchFailure: (state, action) => {
      state.room.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
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
  createMatch,
  createMatchSuccess,
  createMatchFailure,

  joinMatch,
  joinMatchSuccess,
  joinMatchFailure,

  setOnlineMatchToast,
} = onlineMatchSlice.actions

export default onlineMatchSlice.reducer
