import { LudoStatus } from '@/constants'
import { Position } from '@/shared.types'
import {
  killToken,
  MatchState,
  moveToken,
  pickToken,
  pickTokenFailure,
  pickTokenSuccess,
  setHighlightTokens,
  throwDice,
  throwDiceFailure,
  throwDiceSuccess,
} from '@/features/match/matchSlice'
import { RootState } from '@/store'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  all,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import {
  checkTokenKill,
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
    yield moveTokenWorker({ currIndex, nextIndex, tokenIndex })

    //Check if other token killed
    const killedToken = checkTokenKill(state, nextIndex)
    if (killedToken) {
      // yield killTokenWorker(killedToken)
      yield put(killToken({ killedToken }))
      yield delay(200)
    }
    yield put(
      throwDiceSuccess({
        diceValue,
        status: LudoStatus.throwDice,
        isNextPlayerTurn: diceValue !== 6 && !killedToken && nextIndex !== 56,
      })
    )
  } else {
    yield put(
      setHighlightTokens({
        tokenIndexes: movableTokens.map((e) => e.tokenIndex),
        highlight: true,
      })
    )
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
  yield put(
    setHighlightTokens({
      highlight: false,
    })
  )

  const { currIndex, nextIndex } = move
  yield moveTokenWorker({ currIndex, nextIndex, tokenIndex })

  //Check if other token killed
  const killedToken = checkTokenKill(state, nextIndex)
  if (killedToken) {
    yield put(killToken({ killedToken }))
    yield delay(200)
  }
  yield put(
    pickTokenSuccess({
      isNextPlayerTurn:
        matchState.dice.value !== 6 && !killedToken && nextIndex !== 56,
    })
  )
}

function* moveTokenWorker({
  currIndex,
  nextIndex,
  tokenIndex,
}: {
  currIndex: number
  nextIndex: number
  tokenIndex: number
}) {
  for (let i = currIndex + 1; i <= nextIndex; i++) {
    yield put(moveToken({ tokenIndex, pathIndex: i }))
    if (i < nextIndex) {
      yield delay(200)
    }
  }
}

export default function* () {
  yield all([
    takeLatest(throwDice.type, throwDiceWorker),
    takeEvery(pickToken.type, pickTokenWorker),
  ])
}
