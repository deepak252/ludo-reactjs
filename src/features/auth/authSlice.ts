/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SignInFormValues } from './auth.types'

type AuthState = {
  isAuthenticated?: boolean
  signIn: {
    isLoading: boolean
  }
  signUp: {
    isLoading: boolean
  }
  toastData?: ToastData | null
}

const initialState: AuthState = {
  signIn: {
    isLoading: false,
  },
  signUp: {
    isLoading: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign In
    signIn: (state, _: PayloadAction<SignInFormValues>) => {
      state.signIn.isLoading = true
    },
    signInSuccess: (state) => {
      state.signIn.isLoading = false
      state.isAuthenticated = true
    },
    signInFailure: (state, action) => {
      state.signIn.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    // Sign In
    signUp: (state, _: PayloadAction<SignInFormValues>) => {
      state.signUp.isLoading = true
    },
    signUpSuccess: (state) => {
      state.signUp.isLoading = false
      state.isAuthenticated = true
    },
    signUpFailure: (state, action) => {
      state.signUp.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },

    setAuthToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
    resetAuthState: (state) => {
      return {
        ...initialState,
        toastData: state.toastData,
      }
    },
  },
  // extraReducers: (builder) =>
  //   builder.addCase(signOutSuccess, () => initialState),
})

export const {
  signIn,
  signInSuccess,
  signInFailure,

  signUp,
  signUpSuccess,
  signUpFailure,

  setAuthToast,
  resetAuthState,
} = authSlice.actions

export default authSlice.reducer
