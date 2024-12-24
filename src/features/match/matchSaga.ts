import { DICE_VALUES, LudoStatus } from '@/constants'
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
import _ from 'lodash'

// Check if token is present at selected position, return token index
const checkTokenPresent = (state: MatchState, position: Position) => {
  const currPlayer = state.turn
  const tokens = state.players[currPlayer].tokens
  for (let i = 0; i < 4; i++) {
    if (_.isEqual(tokens[i].position, position)) {
      return i
    }
  }
  return -1
}

/**
 * @param index : Token index
 */
const getTokenNextPosition = (state: MatchState, tokenIndex: number) => {
  const currPlayer = state.turn
  const diceValue = state.dice.value
  const token = { ...state.players[currPlayer].tokens[tokenIndex] }
  const currIndex = token.pathIndex
  let nextIndex = token.pathIndex
  if (token.pathIndex === -1) {
    if (diceValue === 6) {
      nextIndex = 0
    } else {
      return null
    }
  } else {
    if (token.pathIndex + diceValue <= 56) {
      nextIndex += diceValue
    } else {
      return null
    }
  }
  return { currIndex, nextIndex }
}

function* pickTokenWorker(
  action: PayloadAction<{ position: Position }>
): Generator<any, any, any> {
  console.log('pickTokenWorker')
  const state = yield select((state: RootState) => state.match)
  if (!state.isOngoing || state.status !== LudoStatus.pickToken) {
    yield put(pickTokenFailure({ message: 'Pick token disabled' }))
    return
  }
  const { position } = action.payload
  const tokenIndex = checkTokenPresent(state, position)
  if (tokenIndex === -1) {
    yield put(pickTokenFailure({ message: 'Invalid move' }))
    return
  }
  const res = getTokenNextPosition(state, tokenIndex)
  if (!res) {
    yield put(pickTokenFailure({ message: 'Invalid Token move' }))
    return
  }
  for (let i = res.currIndex + 1; i <= res.nextIndex; i++) {
    yield put(moveToken({ tokenIndex, pathIndex: i }))
    yield delay(200)
  }
  yield put(pickTokenSuccess())
}

function* throwDiceWorker(): Generator<any, any, any> {
  const state = yield select((state: RootState) => state.match)
  console.log('throwDiceWorker', state.status)

  const di = Math.floor(Math.random() * DICE_VALUES.length)
  const diceValue = DICE_VALUES[di]
  // state.dice = { value: DICE_VALUES[di] }
  // state.status = LudoStatus.pickToken
  if (!state.isOngoing || state.status !== LudoStatus.throwDice) {
    yield put(throwDiceFailure({ message: 'Invalid move' }))
    return
  }
  yield put(throwDiceSuccess({ diceValue }))
}

export default function* () {
  yield all([
    takeLatest(throwDice.type, throwDiceWorker),
    takeLatest(pickToken.type, pickTokenWorker),
  ])
}
