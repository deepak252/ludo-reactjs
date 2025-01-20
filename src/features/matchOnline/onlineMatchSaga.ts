import { PayloadAction } from '@reduxjs/toolkit'
import { all, put, takeLatest } from 'redux-saga/effects'
import { apiWorker } from '@/services/api'
import {
  createRoom,
  createRoomFailure,
  createRoomSuccess,
} from './onlineMatchSlice'
import { CreateRoomFormValues } from '@/shared.types'
import { createRoomApi } from './onlineMatchApi'

function* createRoomWorker(
  action: PayloadAction<CreateRoomFormValues>
): Generator {
  const { maxPlayersCount = 2 } = action.payload
  yield* apiWorker(
    createRoomApi,
    { maxPlayersCount },
    {
      onSuccess: function* (response) {
        yield put(createRoomSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(createRoomFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

export default function* () {
  yield all([takeLatest(createRoom.type, createRoomWorker)])
}
