import { PayloadAction } from '@reduxjs/toolkit'
import { all, put, takeLatest } from 'redux-saga/effects'
import { apiWorker } from '@/services/api'
import {
  createMatch,
  createMatchFailure,
  createMatchSuccess,
  joinMatch,
  joinMatchFailure,
  joinMatchSuccess,
} from './onlineMatchSlice'
import { CreateRoomFormValues } from '@/shared.types'
import { createMatchApi, joinMatchApi } from './onlineMatchApi'

function* createMatchWorker(
  action: PayloadAction<CreateRoomFormValues>
): Generator {
  const { maxPlayersCount = 2 } = action.payload
  yield* apiWorker(
    createMatchApi,
    { maxPlayersCount },
    {
      onSuccess: function* (response) {
        yield put(createMatchSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(createMatchFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* joinMatchWorker(
  action: PayloadAction<{ roomId: string }>
): Generator {
  const { roomId } = action.payload
  yield* apiWorker(
    joinMatchApi,
    { roomId },
    {
      onSuccess: function* (response) {
        yield put(joinMatchSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(joinMatchFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

export default function* () {
  yield all([
    takeLatest(createMatch.type, createMatchWorker),
    takeLatest(joinMatch.type, joinMatchWorker),
  ])
}
