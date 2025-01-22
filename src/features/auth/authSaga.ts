import { all, put, takeLatest } from 'redux-saga/effects'
import {
  checkUsername,
  checkUsernameFailure,
  checkUsernameSuccess,
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signOutFailure,
  signOutSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
} from './authSlice'
import AuthService from './authService'
import { PayloadAction } from '@reduxjs/toolkit'
import { SignInFormValues, SignUpFormValues } from './auth.types'
import { apiWorker } from '@/services/api'
import { removeUserFromStorage, saveAccessToken } from '@/utils/storage'

function* signInWorker(action: PayloadAction<SignInFormValues>): Generator {
  const { usernameOrEmail, password } = action.payload
  yield* apiWorker(
    AuthService.signIn,
    { usernameOrEmail, password },
    {
      onSuccess: function* (response) {
        saveAccessToken(response.data?.data?.accessToken)
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
    AuthService.signUp,
    { username, email, password },
    {
      onSuccess: function* (response) {
        saveAccessToken(response.data?.data?.accessToken)
        yield put(signUpSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(signUpFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* sigOutWorker(): Generator {
  yield* apiWorker(AuthService.signOut, undefined, {
    onSuccess: function* (response) {
      removeUserFromStorage()
      yield put(signOutSuccess(response.data))
    },
    onFailure: function* (error) {
      removeUserFromStorage()
      yield put(signOutFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* checkUsernameWorker(
  action: PayloadAction<{ username: string }>
): Generator {
  const { username } = action.payload
  yield* apiWorker(
    AuthService.checkUsername,
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
    takeLatest(signOut.type, sigOutWorker),
    takeLatest(checkUsername.type, checkUsernameWorker),
  ])
}
