import { all, put, takeLatest } from 'redux-saga/effects'
import { apiWorker } from '@/services/api'
import { getUserFromStorage, saveUserToStorage } from '@/utils/storage'
import UserService from './userService'
import { getProfile, getProfileFailure, getProfileSuccess } from './userSlice'

function* getProfileWorker(): Generator {
  const user = getUserFromStorage()
  if (user) {
    yield put(getProfileSuccess(user))
  }
  yield* apiWorker(UserService.getUserProfile, undefined, {
    onSuccess: function* (response) {
      saveUserToStorage(response.data?.data)
      yield put(getProfileSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getProfileFailure(error?.message || 'Something went wrong'))
    },
  })
}

export default function* () {
  yield all([takeLatest(getProfile.type, getProfileWorker)])
}
