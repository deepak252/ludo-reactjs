import { PayloadAction } from '@reduxjs/toolkit'
import { all, put, takeLatest } from 'redux-saga/effects'
import { apiWorker } from '@/services/api'
import {
  createMatch,
  createMatchFailure,
  createMatchSuccess,
  getMatchHistory,
  getMatchHistoryFailure,
  getMatchHistorySuccess,
  getOngoingMatch,
  getOngoingMatchFailure,
  getOngoingMatchSuccess,
  joinMatch,
  joinMatchFailure,
  joinMatchSuccess,
} from './onlineMatchSlice'
import { CreateRoomFormValues } from '@/shared.types'
import OnlineMatchService from './onlineMatchService'

function* createMatchWorker(
  action: PayloadAction<CreateRoomFormValues>
): Generator {
  const { maxPlayersCount = 2 } = action.payload
  yield* apiWorker(
    OnlineMatchService.createMatch,
    { maxPlayersCount },
    {
      onSuccess: function* (response) {
        yield put(createMatchSuccess(response.data?.data))
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
    OnlineMatchService.joinMatch,
    { roomId },
    {
      onSuccess: function* (response) {
        yield put(joinMatchSuccess(response.data?.data))
      },
      onFailure: function* (error) {
        yield put(joinMatchFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* getOngoingMatchWorker(): Generator {
  yield* apiWorker(OnlineMatchService.getOngoingMatch, undefined, {
    onSuccess: function* (response) {
      yield put(getOngoingMatchSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getOngoingMatchFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

function* getMatchHistoryWorker(): Generator {
  yield* apiWorker(OnlineMatchService.getMatchHistory, undefined, {
    onSuccess: function* (response) {
      yield put(getMatchHistorySuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getMatchHistoryFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

export default function* () {
  yield all([
    takeLatest(createMatch.type, createMatchWorker),
    takeLatest(joinMatch.type, joinMatchWorker),
    takeLatest(getOngoingMatch.type, getOngoingMatchWorker),
    takeLatest(getMatchHistory.type, getMatchHistoryWorker),
  ])
}
