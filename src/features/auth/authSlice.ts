/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SignInFormValues, SignUpFormValues } from './auth.types'

type AuthState = {
  isAuthenticated?: boolean
  signIn: {
    isLoading: boolean
  }
  signUp: {
    isLoading: boolean
  }

  username: {
    value?: string
    isAvailable?: boolean
    isLoading: boolean
    error?: string
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
  username: {
    value: '',
    isAvailable: false,
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
    signUp: (state, _: PayloadAction<SignUpFormValues>) => {
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
    // Check username available
    checkUsername: (state, action: PayloadAction<{ username: string }>) => {
      state.username = {
        value: action.payload.username,
        isAvailable: false,
        isLoading: true,
      }
    },
    checkUsernameSuccess: (state) => {
      state.username.isLoading = false
      state.username.isAvailable = true
    },
    checkUsernameFailure: (state, action) => {
      state.username.isLoading = false
      state.username.isAvailable = false
      state.username.error = action.payload
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

  checkUsername,
  checkUsernameSuccess,
  checkUsernameFailure,

  setAuthToast,
  resetAuthState,
} = authSlice.actions

export default authSlice.reducer
