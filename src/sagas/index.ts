import { all } from 'redux-saga/effects'
import matchSaga from './matchSaga'

export function* rootSaga() {
  yield all([matchSaga()])
}
