import { all } from 'redux-saga/effects'
import offlineMatchSaga from '../features/matchOffline/offlineMatchSaga'

export function* rootSaga() {
  yield all([offlineMatchSaga()])
}
