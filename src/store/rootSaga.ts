import { all } from 'redux-saga/effects'
import offlineMatchSaga from '@/features/matchOffline/offlineMatchSaga'
import authSaga from '@/features/auth/authSaga'
import userSaga from '@/features/user/userSaga'

export function* rootSaga() {
  yield all([offlineMatchSaga(), authSaga(), userSaga()])
}
