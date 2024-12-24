import { LudoStatus } from '@/constants'
import { Position } from '@/shared.types'
import {
  MatchState,
  moveToken,
  pickToken,
  pickTokenFailure,
  pickTokenSuccess,
  throwDice,
  throwDiceFailure,
  throwDiceSuccess,
} from '@/features/match/matchSlice'
import { RootState } from '@/store'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, delay, put, select, takeLatest } from 'redux-saga/effects'
import {
  checkTokenPresent,
  getDiceRandomNumber,
  getMovableTokens,
  getTokenAutoMove,
  getTokenMove,
} from './matchUtil'

function* throwDiceWorker(): Generator<any, any, any> {
  const state = yield select((state: RootState) => state.match)
  const matchState: MatchState = { ...state }
  console.log('throwDiceWorker', matchState.status)
  if (!matchState.isOngoing || matchState.status !== LudoStatus.throwDice) {
    yield put(throwDiceFailure({ message: 'Invalid move' }))
    return
  }
  const diceValue = getDiceRandomNumber()
  // const diceValue = 6
  yield put(
    throwDiceSuccess({
      diceValue,
      status: LudoStatus.moving,
      isNextPlayerTurn: false,
    })
  )

  matchState.dice = { value: diceValue }

  const movableTokens = getMovableTokens(matchState)

  if (!movableTokens.length) {
    // yield put(throwDiceFailure({ message: "Can't move token", diceValue }))
    yield put(
      throwDiceSuccess({
        diceValue,
        status: LudoStatus.throwDice,
        isNextPlayerTurn: diceValue !== 6,
      })
    )
    return
  }

  const tokenAutoMove = getTokenAutoMove(matchState)

  if (tokenAutoMove) {
    const { currIndex, nextIndex, tokenIndex } = tokenAutoMove
    for (let i = currIndex + 1; i <= nextIndex; i++) {
      yield put(moveToken({ tokenIndex, pathIndex: i }))
      yield delay(200)
    }
    //TODO: Check if other token killed
    yield put(
      throwDiceSuccess({
        diceValue,
        status: LudoStatus.throwDice,
        isNextPlayerTurn: diceValue !== 6,
      })
    )
  } else {
    yield put(
      throwDiceSuccess({
        diceValue,
        status: LudoStatus.pickToken,
        isNextPlayerTurn: diceValue !== 6,
      })
    )
  }
}

function* pickTokenWorker(
  action: PayloadAction<{ position: Position }>
): Generator<any, any, any> {
  console.log('pickTokenWorker')
  const state = yield select((state: RootState) => state.match)
  const matchState: MatchState = { ...state }
  if (!matchState.isOngoing || matchState.status !== LudoStatus.pickToken) {
    yield put(pickTokenFailure({ message: 'Pick token disabled' }))
    return
  }
  const { position } = action.payload
  const tokenIndex = checkTokenPresent(matchState, position)
  if (tokenIndex === -1) {
    yield put(pickTokenFailure({ message: 'Invalid move' }))
    return
  }
  const move = getTokenMove(matchState, tokenIndex)
  if (!move) {
    yield put(pickTokenFailure({ message: 'Invalid Token move' }))
    return
  }
  for (let i = move.currIndex + 1; i <= move.nextIndex; i++) {
    yield put(moveToken({ tokenIndex, pathIndex: i }))
    yield delay(200)
  }
  //TODO: Check if other token killed
  yield put(pickTokenSuccess({ isNextPlayerTurn: matchState.dice.value !== 6 }))
}

export default function* () {
  yield all([
    takeLatest(throwDice.type, throwDiceWorker),
    takeLatest(pickToken.type, pickTokenWorker),
  ])
}
