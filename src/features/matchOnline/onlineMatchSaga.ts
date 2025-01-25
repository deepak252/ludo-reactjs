import { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'
import { EventChannel, eventChannel } from 'redux-saga'
import { all, call, fork, put, takeLatest, take } from 'redux-saga/effects'
import { apiWorker } from '@/services/api'
import {
  connectOnlineMatch,
  createMatch,
  createMatchFailure,
  createMatchSuccess,
  getMatchHistory,
  getMatchHistoryFailure,
  getMatchHistorySuccess,
  getOngoingMatch,
  // getOngoingMatchFailure,
  getOngoingMatchSuccess,
  joinMatch,
  joinMatchFailure,
  joinMatchSuccess,
} from './onlineMatchSlice'
import { CreateRoomFormValues } from '@/shared.types'
import OnlineMatchService from './onlineMatchService'
import SocketService from '@/services/socket/socketService'
import { MatchOnline } from './onlineMatch.types'

function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel((emit) => {
    // Event listeners for the socket
    console.log('onlineMatch socket channel')

    const getOngoingMatchHandler = (data?: MatchOnline) => {
      if (data) {
        emit(getOngoingMatchSuccess(data))
      }
    }

    socket.on('ongoingMatch', getOngoingMatchHandler) // Custom event

    return () => {
      console.log('onlineMatchSocket: cleanUp')

      socket.off('ongoingMatch', getOngoingMatchHandler)
    }
  })
}

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

// Worker saga to handle incoming socket events
function* handleSocketEvents(socket: Socket): Generator {
  const socketChannel: EventChannel<any> = yield call(
    createSocketChannel,
    socket
  )

  try {
    while (true) {
      const action = yield take(socketChannel) // Take actions emitted by the channel
      yield put(action) // Dispatch action to Redux
    }
  } catch (error) {
    console.error('Socket error:', error)
  } finally {
    console.log('socketChannel closed')
    socketChannel.close() // Cleanup the channel
  }
}

function* getOngoingMatchWorker(socket: Socket): Generator {
  try {
    while (true) {
      yield take(getOngoingMatch.type)
      socket.emit('ongoingMatch')
    }
  } catch (error) {
    console.error('pingWorker error:', error)
  }
}

function* onlineMatchWorker(): Generator {
  const socket = yield call(SocketService.getSocket)
  // socket.connect()
  yield fork(handleSocketEvents, socket)
  yield fork(getOngoingMatchWorker, socket)
}

export default function* () {
  yield all([
    takeLatest(connectOnlineMatch.type, onlineMatchWorker),
    takeLatest(createMatch.type, createMatchWorker),
    takeLatest(joinMatch.type, joinMatchWorker),
    // takeLatest(getOngoingMatch.type, getOngoingMatchWorker),
    takeLatest(getMatchHistory.type, getMatchHistoryWorker),
  ])
}
