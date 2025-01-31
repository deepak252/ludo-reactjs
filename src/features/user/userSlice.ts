/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signOutSuccess } from '../auth/authSlice'
import { User } from './user.types'

type UserState = {
  profile: {
    data?: User
    isLoading?: boolean
  }
  muted: boolean
  toastData?: ToastData | null
}

const initialState: UserState = {
  profile: {
    isLoading: false,
  },
  muted: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Get user profile
    getProfile: (state) => {
      state.profile.isLoading = true
    },
    getProfileSuccess: (state, action: PayloadAction<User>) => {
      state.profile.isLoading = false
      state.profile.data = action.payload
    },
    getProfileFailure: (state, action) => {
      state.profile.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    toggleMuted: (state) => {
      state.muted = !state.muted
    },

    setUserToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
    resetUserState: (state) => {
      return {
        ...initialState,
        toastData: state.toastData,
      }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(signOutSuccess, () => initialState),
})

export const {
  getProfile,
  getProfileSuccess,
  getProfileFailure,

  toggleMuted,

  setUserToast,
  resetUserState,
} = userSlice.actions

export default userSlice.reducer
