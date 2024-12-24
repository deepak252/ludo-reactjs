import { all } from 'redux-saga/effects'
import matchSaga from '../features/match/matchSaga'

export function* rootSaga() {
  yield all([matchSaga()])
}
