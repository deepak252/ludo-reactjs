import { Socket } from 'socket.io-client'
import { EventChannel, eventChannel } from 'redux-saga'
import {
  all,
  call,
  fork,
  put,
  takeLatest,
  take,
  select,
  delay,
  takeEvery,
} from 'redux-saga/effects'
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
  getOngoingMatchFailure,
  getOngoingMatchSuccess,
  joinMatch,
  joinMatchFailure,
  joinMatchSuccess,
  moveToken,
  pickToken,
  rollDice,
  rollDiceFailure,
  setMatchState,
  tokenMoved,
} from './onlineMatchSlice'
import { CreateRoomFormValues, KilledToken, TokenMove } from '@/shared.types'
import OnlineMatchService from './onlineMatchService'
import SocketService from '@/services/socket/socketService'
import { MatchOnline } from './onlineMatch.types'
import { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import BoardConstants from '@/constants/boardConstants'
import { pickTokenFailure } from '../matchOffline/offlineMatchSlice'

function* getRoomId() {
  const roomId: string | undefined = yield select(
    (state: RootState) => state.matchOnline.room.match?.roomId
  )
  return roomId
}

function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel((emit) => {
    // Event listeners for the socket
    console.log('onlineMatch socket channel')

    const getOngoingMatchHandler = (data?: MatchOnline) => {
      if (data) {
        emit(getOngoingMatchSuccess(data))
      }
    }

    const matchStateChangeHandler = (data: Partial<MatchOnline>) => {
      console.log(data)

      emit(setMatchState(data))
    }

    // const pickTokenHandler = (data: {
    //   // match: MatchOnline
    //   // movableTokens: TokenMove[]
    // }) => {
    //   console.log(data)
    // }
    const tokenMovedHandler = (data: { move: TokenMove }) => {
      // console.log(data)
      // yield moveTokenWorker(data.move)
      emit(tokenMoved(data.move))
    }
    const tokenKilledHandler = (data: {
      match: MatchOnline
      killedTokens: KilledToken[]
    }) => {
      console.log(data)
    }

    socket.on('ongoingMatch', getOngoingMatchHandler)
    // socket.on('pickToken', pickTokenHandler)
    socket.on('tokenMoved', tokenMovedHandler)
    socket.on('tokenKilled', tokenKilledHandler)
    socket.on('matchStateChange', matchStateChangeHandler)

    return () => {
      console.log('onlineMatchSocket: cleanUp')

      socket.off('ongoingMatch', getOngoingMatchHandler)
    }
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

function* createMatchWorker(socket: Socket): Generator {
  while (true) {
    try {
      const { payload = {} }: PayloadAction<CreateRoomFormValues> = yield take(
        createMatch.type
      )
      const { maxPlayersCount = 2 } = payload
      const res: MatchOnline = yield call(
        OnlineMatchService.createMatch,
        socket,
        { maxPlayersCount }
      )
      if (res?.roomId) {
        yield put(createMatchSuccess(res))
      }
    } catch (e: any) {
      console.error('createMatchWorker error:', e)
      yield put(createMatchFailure(e?.message || 'Failed to create match'))
    }
  }
}

function* joinMatchWorker(socket: Socket): Generator {
  while (true) {
    try {
      const { payload }: PayloadAction<{ roomId: string }> = yield take(
        joinMatch.type
      )
      const { roomId } = payload

      const res: MatchOnline = yield call(
        OnlineMatchService.joinMatch,
        socket,
        { roomId }
      )

      if (res?.roomId) {
        yield put(joinMatchSuccess(res))
      }
    } catch (e: any) {
      console.error('joinMatchWorker error:', e)
      yield put(joinMatchFailure(e?.message || 'Failed to join match'))
    }
  }
}

function* getOngoingMatchWorker(socket: Socket): Generator {
  while (true) {
    try {
      yield take(getOngoingMatch.type)
      socket.emit('ongoingMatch')
    } catch (e: any) {
      console.error('getOngoingMatchWorker error:', e)
      yield put(
        getOngoingMatchFailure(e?.message || 'Failed to fetch ongoing match')
      )
    }
  }
}

function* rollDiceWorker(socket: Socket): Generator {
  while (true) {
    try {
      yield take(rollDice.type)
      const roomId = yield call(getRoomId)
      socket.emit('rollDice', { roomId })
    } catch (e: any) {
      console.error('rollDiceWorker error:', e)
      yield put(rollDiceFailure(e?.message || 'Failed to roll dice'))
    }
  }
}

function* pickTokenWorker(socket: Socket): Generator {
  while (true) {
    try {
      const { payload }: PayloadAction<{ tokenIndex: number }> = yield take(
        pickToken.type
      )
      const { tokenIndex } = payload
      const roomId = yield call(getRoomId)
      socket.emit('pickToken', { roomId, tokenIndex })
    } catch (e: any) {
      console.error('pickTokenWorker error:', e)
      yield put(pickTokenFailure(e?.message || 'Failed to pick token'))
    }
  }
}

function* tokenMovedWorker(action: PayloadAction<TokenMove>) {
  const { currIndex, nextIndex, tokenIndex } = action.payload
  for (let i = currIndex + 1; i <= nextIndex; i++) {
    yield put(moveToken({ tokenIndex, pathIndex: i }))
    if (i < nextIndex) {
      yield delay(BoardConstants.ANIMATION_DELAY)
    }
  }
}

function* onlineMatchWorker(): Generator {
  const socket: Socket = yield call(SocketService.getSocket)
  // socket.connect()
  yield fork(handleSocketEvents, socket)
  yield fork(getOngoingMatchWorker, socket)
  yield fork(createMatchWorker, socket)
  yield fork(joinMatchWorker, socket)
  yield fork(rollDiceWorker, socket)
  yield fork(pickTokenWorker, socket)
}

export default function* () {
  yield all([
    takeLatest(connectOnlineMatch.type, onlineMatchWorker),
    takeEvery(tokenMoved.type, tokenMovedWorker),
    takeLatest(getMatchHistory.type, getMatchHistoryWorker),
  ])
}
