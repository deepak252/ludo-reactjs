import { all } from 'redux-saga/effects'
import offlineMatchSaga from '../features/matchOffline/offlineMatchSaga'
import authSaga from '../features/auth/authSaga'

export function* rootSaga() {
  yield all([offlineMatchSaga(), authSaga()])
}
