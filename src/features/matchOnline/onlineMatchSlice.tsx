import { ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type onlineMatchState = {
  username: {
    value?: string
    isAvailable?: boolean
    isLoading: boolean
  }
  toastData?: ToastData | null
}

const initialState: onlineMatchState = {
  username: {
    value: '',
    isAvailable: false,
    isLoading: false,
  },
}

const onlineMatchSlice = createSlice({
  name: 'matchOnline',
  initialState,
  reducers: {
    checkUsername: (state, action: PayloadAction<{ username: string }>) => {
      state.username = {
        value: action.payload.username,
        isAvailable: false,
        isLoading: true,
      }
    },
    checkUsernameSuccess: (
      state,
      action: PayloadAction<{ isAvailable: boolean }>
    ) => {
      state.username.isLoading = false
      state.username.isAvailable = action.payload.isAvailable
    },
    checkUsernameFailure: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.username.isLoading = false
      state.username.isAvailable = false
      state.toastData = {
        type: 'failure',
        message: action.payload.message,
      }
    },

    setOnlineMatchToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
  },
})

export const {
  checkUsername,
  checkUsernameSuccess,
  checkUsernameFailure,

  setOnlineMatchToast,
} = onlineMatchSlice.actions

export default onlineMatchSlice.reducer
