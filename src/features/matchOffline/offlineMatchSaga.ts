import { Position } from '@/shared.types'
import {
  killTokens,
  OfflineMatchState,
  moveToken,
  pickToken,
  pickTokenFailure,
  pickTokenSuccess,
  setHighlightTokens,
  setStatus,
  throwDice,
  throwDiceFailure,
  throwDiceSuccess,
} from '@/features/matchOffline/offlineMatchSlice'
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
} from './offlineMatchUtil'
import BoardConstants from '@/constants/boardConstants'
import { BoardState } from '@/constants/enums'

function* throwDiceWorker(): Generator<any, any, any> {
  const state = yield select((state: RootState) => state.matchOffline)
  const matchState: OfflineMatchState = { ...state }
  console.log('throwDiceWorker', matchState.boardState)
  if (!matchState.isOngoing || matchState.boardState !== BoardState.RollDice) {
    yield put(throwDiceFailure({ message: 'Throw dice disabled' }))
    return
  }
  yield put(setStatus(BoardState.DiceRolling))
  const diceValue = getDiceRandomNumber()
  yield delay(BoardConstants.DICE_DELAY)

  // const diceValue = 6
  yield put(
    throwDiceSuccess({
      diceValue,
      status: BoardState.TokenMoving,
      isNextPlayerTurn: false,
    })
  )

  matchState.dice = { value: diceValue }

  const movableTokens = getMovableTokens(matchState)

  if (!movableTokens.length) {
    yield put(
      throwDiceSuccess({
        diceValue,
        status: BoardState.RollDice,
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
    const killedTokens = checkTokenKill(state, nextIndex)
    if (killedTokens.length) {
      yield put(killTokens({ killedTokens }))
      yield delay(BoardConstants.ANIMATION_DELAY)
    }
    yield put(
      throwDiceSuccess({
        diceValue,
        status: BoardState.RollDice,
        isNextPlayerTurn:
          diceValue !== 6 && !killedTokens.length && nextIndex !== 56,
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
        status: BoardState.PickToken,
        isNextPlayerTurn: diceValue !== 6,
      })
    )
  }
}

function* pickTokenWorker(
  action: PayloadAction<{ position: Position }>
): Generator<any, any, any> {
  console.log('pickTokenWorker')
  const state = yield select((state: RootState) => state.matchOffline)
  const matchState: OfflineMatchState = { ...state }
  if (!matchState.isOngoing || matchState.boardState !== BoardState.PickToken) {
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
  const killedTokens = checkTokenKill(state, nextIndex)
  if (killedTokens.length) {
    yield put(killTokens({ killedTokens }))
    yield delay(BoardConstants.ANIMATION_DELAY)
  }
  yield put(
    pickTokenSuccess({
      isNextPlayerTurn:
        matchState.dice.value !== 6 && !killedTokens.length && nextIndex !== 56,
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
      yield delay(BoardConstants.ANIMATION_DELAY)
    }
  }
}

export default function* () {
  yield all([
    takeLatest(throwDice.type, throwDiceWorker),
    takeEvery(pickToken.type, pickTokenWorker),
  ])
}
