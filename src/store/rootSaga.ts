import { all, fork } from 'redux-saga/effects'
import authSaga from '@/features/auth/authSaga'
import userSaga from '@/features/user/userSaga'
import offlineMatchSaga from '@/features/matchOffline/offlineMatchSaga'
import onlineMatchSaga from '@/features/matchOnline/onlineMatchSaga'
import socketSaga from '@/services/socket/socketSaga'
import tempSaga from '@/features/temp/tempSaga'

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(userSaga),
    fork(offlineMatchSaga),
    fork(onlineMatchSaga),
    fork(socketSaga),
    fork(tempSaga),
  ])
}
