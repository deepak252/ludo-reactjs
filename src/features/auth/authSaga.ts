import { all, put, takeLatest } from 'redux-saga/effects'
import {
  checkUsername,
  checkUsernameFailure,
  checkUsernameSuccess,
  signIn,
  signInFailure,
  signInSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
} from './authSlice'
import { checkUsernameApi, signInApi, signUpApi } from './authApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { SignInFormValues, SignUpFormValues } from './auth.types'
import { apiWorker } from '@/services/api'
// import { saveAccessToken } from '@/utils/storage'

function* signInWorker(action: PayloadAction<SignInFormValues>): Generator {
  const { usernameOrEmail, password } = action.payload
  yield* apiWorker(
    signInApi,
    { usernameOrEmail, password },
    {
      onSuccess: function* (response) {
        // saveAccessToken(response.data?.data?.access_token)
        yield put(signInSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(signInFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* signUpWorker(action: PayloadAction<SignUpFormValues>): Generator {
  const { username, email, password } = action.payload
  yield* apiWorker(
    signUpApi,
    { username, email, password },
    {
      onSuccess: function* (response) {
        // saveAccessToken(response.data?.data?.access_token)
        yield put(signUpSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(signUpFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* checkUsernameWorker(
  action: PayloadAction<{ username: string }>
): Generator {
  const { username } = action.payload
  yield* apiWorker(
    checkUsernameApi,
    { username },
    {
      onSuccess: function* (response) {
        yield put(checkUsernameSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          checkUsernameFailure(error?.message || 'Something went wrong')
        )
      },
    }
  )
}

export default function* () {
  yield all([
    takeLatest(signIn.type, signInWorker),
    takeLatest(signUp.type, signUpWorker),
    takeLatest(checkUsername.type, checkUsernameWorker),
  ])
}
