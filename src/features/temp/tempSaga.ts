import {
  all,
  delay,
  fork,
  takeLatest,
  join,
  take,
  actionChannel,
  call,
} from 'redux-saga/effects'
import { startTask } from './tempSlice'

function* backgroundTask() {
  // while (true) {
  //   console.log('backgroundTask')
  //   yield delay(1000)
  // }
  console.log('backgroundTask: start')
  yield delay(2000)
  console.log('backgroundTask: end')
  return 2
}

function* taskWorker(): Generator {
  console.log('taskWorker: end')
  const task = yield fork(backgroundTask)

  // console.log({ a })
  const result: number = yield join(task)
  console.log('backgroundTask result:', result) // Outputs 2

  console.log('taskWorker: end')
}

function* watchRequests(): Generator {
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    yield take(requestChan)
    console.log('Request received')
    // 3- Note that we're using a blocking call
    yield call(backgroundTask)
  }
  // while (true) {
  //   yield take('REQUEST')
  //   console.log('Request received')

  //   yield fork(backgroundTask)
  // }
}

export default function* () {
  yield all([
    takeLatest(startTask.type, taskWorker),
    // watchRequests(),
    watchRequests(),
    // fork(backgroundTask)
  ])
}
