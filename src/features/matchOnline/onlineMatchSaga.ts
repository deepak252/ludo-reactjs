import { RootState } from '@/store'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  all,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import { checkUsername } from './onlineMatchSlice'
import { apiWorker } from '@/services/api'
import { signUpApi } from '../auth/authApi'

function* checkUsernameHandler(
  action: PayloadAction<{ username: string }>
): Generator {
  const { username } = action.payload
  yield* apiWorker(
    signUpApi,
    { username },
    {
      onSuccess: function* (response) {
        saveAccessToken(response.data?.data?.access_token)
        yield put(signInSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(signInFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

export default function* () {
  yield all([takeLatest(checkUsername.type, checkUsernameHandler)])
}
