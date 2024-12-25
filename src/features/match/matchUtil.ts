import { DICE_VALUES } from '@/constants'
import { MatchState } from './matchSlice'
import { KilledToken, PlayerType, Position, TokenMove } from '@/shared.types'
import _ from 'lodash'
import BoardConstants from '@/constants/boardConstants'
/**
 * @returns random number from 1 to 6
 */
export const getDiceRandomNumber = () => {
  const di = Math.floor(Math.random() * DICE_VALUES.length)
  return DICE_VALUES[di]
}

/**
 * Evaluates selected token next path index
 * @param index - Token index
 */
export const getTokenMove = (
  state: MatchState,
  tokenIndex: number
): TokenMove | null => {
  const currPlayer = state.turn
  const diceValue = state.dice.value
  const currIndex = state.players[currPlayer].tokens[tokenIndex].pathIndex
  let nextIndex = currIndex
  if (currIndex === -1) {
    if (diceValue === 6) {
      nextIndex = 0
    } else {
      return null
    }
  } else {
    if (currIndex + diceValue <= 56) {
      nextIndex += diceValue
    } else {
      return null
    }
  }
  return { currIndex, nextIndex }
}

/**
 * Check if token is present at selected position, return token index
 * @param position
 * @returns token index if present at position, otherwise -1
 */
export const checkTokenPresent = (state: MatchState, position: Position) => {
  const currPlayer = state.turn
  const tokens = state.players[currPlayer].tokens
  for (let i = 0; i < 4; i++) {
    if (_.isEqual(tokens[i].position, position)) {
      return i
    }
  }
  return -1
}

export const getMovableTokens = (state: MatchState) => {
  const movableTokens: (TokenMove & {
    tokenIndex: number
  })[] = []

  for (let i = 0; i < 4; i++) {
    const move = getTokenMove(state, i)
    if (move) {
      movableTokens.push({ ...move, tokenIndex: i })
    }
  }
  return movableTokens
}

export const getTokenAutoMove = (state: MatchState) => {
  const movableTokens = getMovableTokens(state)
  if (!movableTokens.length) {
    return null
  }
  const tokenAutoMove = movableTokens[0]
  for (let i = 1; i < movableTokens.length; i++) {
    movableTokens[i].tokenIndex = tokenAutoMove.tokenIndex
    if (!_.isEqual(tokenAutoMove, movableTokens[i])) {
      return null
    }
  }
  return tokenAutoMove
}

export const checkTokenKill = (
  state: MatchState,
  pathIndex: number
): KilledToken[] => {
  const currPlayer = state.turn
  const pos = BoardConstants.PATH[currPlayer][pathIndex]
  if (BoardConstants.SAFE_CELLS.includesDeep(pos)) {
    console.log('Safe Cell')
    return []
  }
  const killedTokens: KilledToken[] = []
  Object.entries(state.players).forEach(([key, player]) => {
    if (key === currPlayer || killedTokens.length) {
      return
    }
    const tokens = player.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (_.isEqual(tokens[i].position, pos)) {
        killedTokens.push({
          token: tokens[i],
          player: key as PlayerType,
        })
      }
    }
  })
  return killedTokens
}
