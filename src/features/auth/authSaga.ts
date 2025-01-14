import { all, put, takeLatest } from 'redux-saga/effects'
import {
  signIn,
  signInFailure,
  signInSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
} from './authSlice'
import { signInApi, signUpApi } from './authApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { SignInFormValues, SignUpFormValues } from './auth.types'
import { apiWorker } from '@/services/api'
// import { saveAccessToken } from '@/utils/storage'

function* signInWorker(action: PayloadAction<SignInFormValues>): Generator {
  const { email, password } = action.payload
  yield* apiWorker(
    signInApi,
    { email, password },
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
  const { name, email, password } = action.payload
  yield* apiWorker(
    signUpApi,
    { name, email, password },
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

export default function* () {
  yield all([
    takeLatest(signIn.type, signInWorker),
    takeLatest(signUp.type, signUpWorker),
  ])
}
