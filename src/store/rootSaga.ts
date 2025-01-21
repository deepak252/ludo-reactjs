import { all } from 'redux-saga/effects'
import authSaga from '@/features/auth/authSaga'
import userSaga from '@/features/user/userSaga'
import offlineMatchSaga from '@/features/matchOffline/offlineMatchSaga'
import onlineMatchSaga from '@/features/matchOnline/onlineMatchSaga'

export function* rootSaga() {
  yield all([authSaga(), userSaga(), offlineMatchSaga(), onlineMatchSaga()])
}
