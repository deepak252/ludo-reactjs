import { KilledToken, Position, TokenMove } from '@/shared.types'
import {
  killToken,
  moveToken,
  pickToken,
  pickTokenFailure,
  setHighlightTokens,
  setOfflineBoardState,
  rollDice,
  rollDiceSuccess,
  rollDiceFailure,
  tokenMoveSuccess,
  tokenKillSuccess,
  setPlayerTurn,
  tokenKillSound,
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
  getDiceRandomNumber,
  getMovableTokens,
  getNextPlayerTurn,
  getTokenAutoMove,
  getTokenMove,
} from './offlineMatchUtil'
import BoardConstants from '@/constants/boardConstants'
import { BoardState, MatchStatus } from '@/constants/enums'
import { MatchOffline } from './offlineMatch.types'
import { checkTokenPresent } from '@/utils/matchUtil'

function* rollDiceWorker(): Generator<any, any, any> {
  const matchState = yield select(
    (state: RootState) => state.matchOffline.match
  )
  const match: MatchOffline = { ...matchState }
  console.log('rollDiceWorker', match.boardState)
  if (
    match.status !== MatchStatus.InProgress ||
    match.boardState !== BoardState.RollDice
  ) {
    yield put(rollDiceFailure({ message: 'Roll dice disabled' }))
    return
  }
  yield put(setOfflineBoardState(BoardState.DiceRolling))
  const diceValue = getDiceRandomNumber()
  yield delay(BoardConstants.DICE_DELAY)
  match.diceValue = diceValue

  yield put(
    rollDiceSuccess({
      diceValue,
    })
  )

  const movableTokens = getMovableTokens(match)
  let killedTokens: KilledToken[] = []
  let nextIndex = -1

  if (movableTokens.length) {
    const tokenAutoMove = getTokenAutoMove(match)
    if (tokenAutoMove) {
      nextIndex = tokenAutoMove.nextIndex

      yield moveTokenWorker(tokenAutoMove)

      killedTokens = checkTokenKill(match, nextIndex)
      if (killedTokens.length) {
        yield killTokenWorker(killedTokens)
      }
    } else {
      yield put(
        setHighlightTokens({
          tokenIndexes: movableTokens.map((e) => e.tokenIndex),
          highlight: true,
        })
      )
      yield put(setOfflineBoardState(BoardState.PickToken))
      return
    }
  }

  const nextPlayerTurn =
    diceValue === 6 || nextIndex === 56 || killedTokens.length
      ? match.turn
      : getNextPlayerTurn(match)

  yield put(setOfflineBoardState(BoardState.RollDice))
  yield put(setPlayerTurn(nextPlayerTurn))

  // if (!movableTokens.length) {
  //   yield put(
  //     rollDiceSuccess({
  //       diceValue,
  //       status: BoardState.RollDice,
  //       isNextPlayerTurn: diceValue !== 6,
  //     })
  //   )
  //   return
  // }

  // const tokenAutoMove = getTokenAutoMove(matchState)

  // if (tokenAutoMove) {
  //   const { currIndex, nextIndex, tokenIndex } = tokenAutoMove
  //   yield moveTokenWorker({ currIndex, nextIndex, tokenIndex })

  //   //Check if other token killed
  //   const killedTokens = checkTokenKill(state, nextIndex)
  //   if (killedTokens.length) {
  //     yield put(killTokens({ killedTokens }))
  //     yield delay(BoardConstants.ANIMATION_DELAY)
  //   }
  //   yield put(
  //     rollDiceSuccess({
  //       diceValue,
  //       status: BoardState.RollDice,
  //       isNextPlayerTurn:
  //         diceValue !== 6 && !killedTokens.length && nextIndex !== 56,
  //     })
  //   )
  // } else {
  //   yield put(
  //     setHighlightTokens({
  //       tokenIndexes: movableTokens.map((e) => e.tokenIndex),
  //       highlight: true,
  //     })
  //   )
  //   yield put(
  //     rollDiceSuccess({
  //       diceValue,
  //       status: BoardState.PickToken,
  //       isNextPlayerTurn: diceValue !== 6,
  //     })
  //   )
  // }
}

function* pickTokenWorker(
  action: PayloadAction<{ position: Position }>
): Generator<any, any, any> {
  console.log('pickTokenWorker')
  const matchState = yield select(
    (state: RootState) => state.matchOffline.match
  )
  const match: MatchOffline = { ...matchState }
  if (
    match.status !== MatchStatus.InProgress ||
    match.boardState !== BoardState.PickToken
  ) {
    yield put(pickTokenFailure({ message: 'Pick token disabled' }))
    return
  }
  const { position } = action.payload
  const tokenIndex = checkTokenPresent(match.players, match.turn, position)
  if (tokenIndex === -1) {
    yield put(pickTokenFailure({ message: 'Invalid move' }))
    return
  }
  const move = getTokenMove(match, tokenIndex)
  if (!move) {
    yield put(pickTokenFailure({ message: 'Invalid Token move' }))
    return
  }
  yield put(
    setHighlightTokens({
      highlight: false,
    })
  )

  yield moveTokenWorker(move)

  //Check if other token killed
  const killedTokens = checkTokenKill(match, move.nextIndex)
  if (killedTokens.length) {
    yield killTokenWorker(killedTokens)
  }
  const nextPlayerTurn =
    match.diceValue === 6 || move.nextIndex === 56 || killedTokens.length
      ? match.turn
      : getNextPlayerTurn(match)

  yield put(setOfflineBoardState(BoardState.RollDice))
  yield put(setPlayerTurn(nextPlayerTurn))
}

function* moveTokenWorker(move: TokenMove) {
  const { currIndex, nextIndex, tokenIndex } = move
  for (let i = currIndex + 1; i <= nextIndex; i++) {
    yield put(moveToken({ tokenIndex, pathIndex: i }))
    yield delay(BoardConstants.ANIMATION_DELAY)
  }
  yield put(tokenMoveSuccess())
}

function* killTokenWorker(killedTokens: KilledToken[]) {
  const player = killedTokens?.[0]?.player
  const currIndex = killedTokens?.[0]?.move.currIndex
  if (!player) return

  yield put(tokenKillSound())

  for (let i = currIndex - 1; i >= -1; i--) {
    for (const killedToken of killedTokens) {
      yield put(
        killToken({
          player,
          tokenIndex: killedToken.move.tokenIndex,
          pathIndex: i,
        })
      )
    }
    // if (i < nextIndex) {
    yield delay(50)
    // }
  }
  yield put(tokenKillSuccess())
}

export default function* () {
  yield all([
    takeLatest(rollDice.type, rollDiceWorker),
    takeEvery(pickToken.type, pickTokenWorker),
  ])
}
