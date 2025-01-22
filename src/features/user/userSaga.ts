import { all, put, takeLatest } from 'redux-saga/effects'
import { apiWorker } from '@/services/api'
import { saveUserToStorage } from '@/utils/storage'
import UserService from './userService'
import { getProfile, getProfileFailure, getProfileSuccess } from './userSlice'

function* getProfileWorker(): Generator {
  yield* apiWorker(UserService.getUserProfile, undefined, {
    onSuccess: function* (response) {
      saveUserToStorage(response.data?.data)
      yield put(getProfileSuccess(response.data))
    },
    onFailure: function* (error) {
      yield put(getProfileFailure(error?.message || 'Something went wrong'))
    },
  })
}

export default function* () {
  yield all([takeLatest(getProfile.type, getProfileWorker)])
}
