import { DICE_VALUES } from '@/constants'
import { KilledToken, PlayerColor, TokenMove } from '@/shared.types'
import _ from 'lodash'
import BoardConstants from '@/constants/boardConstants'
import { MatchOffline } from './offlineMatch.types'

// export const createOfflineMatch = ({
//   roomId,
//   userId,
//   maxPlayersCount,
// }: {
//   roomId: string
//   userId: string
//   maxPlayersCount: number
// }): MatchDocument => {
//   const match: MatchDocument = {
//     roomId,
//     maxPlayersCount,
//     joinedPlayersCount: 1,
//     createdBy: userId,
//     diceValue: 0,
//     players: {
//       green: { userId: userId, tokens: [], isPlaying: true },
//       yellow: { tokens: [], isPlaying: false },
//       blue: { tokens: [], isPlaying: false },
//       red: { tokens: [], isPlaying: false },
//     },
//     status: MatchStatus.Waiting,
//     boardState: BoardState.RollDice,
//     turn: 'green',
//   }
//   for (const player of PLAYER_TYPES) {
//     for (let i = 0; i < 4; i++) {
//       match.players[player].tokens.push({
//         id: `${player}_${i}`,
//         index: i,
//         color: player,
//         pathIndex: -1,
//       })
//     }
//   }
//   return match
// }

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
  match: MatchOffline,
  tokenIndex: number
): TokenMove | null => {
  const currPlayer = match.turn
  const diceValue = match.diceValue
  const currIndex = match.players[currPlayer].tokens[tokenIndex].pathIndex
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
  const delayInterval = BoardConstants.ANIMATION_DELAY * (nextIndex - currIndex)
  return { tokenIndex, currIndex, nextIndex, delayInterval }
}

// /**
//  * Check if token is present at selected position, return token index
//  * @param position
//  * @returns token index if present at position, otherwise -1
//  */
// export const checkTokenPresent = (
//   players: Players,
//   turn: PlayerColor,
//   position: Position
// ) => {
//   const tokens = players[turn].tokens
//   for (let i = 0; i < 4; i++) {
//     if (_.isEqual(tokens[i].position, position)) {
//       return i
//     }
//   }
//   return -1
// }

export const getMovableTokens = (match: MatchOffline) => {
  const movableTokens: TokenMove[] = []

  for (let i = 0; i < 4; i++) {
    const move = getTokenMove(match, i)
    if (move) {
      movableTokens.push({ ...move, tokenIndex: i })
    }
  }
  return movableTokens
}

export const getTokenAutoMove = (match: MatchOffline) => {
  const movableTokens = getMovableTokens(match)
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

// export const checkTokenKill = (
//   match: OfflineMatchState,
//   pathIndex: number
// ): KilledToken[] => {
//   const currPlayer = match.turn
//   const pos = BoardConstants.PATH[currPlayer][pathIndex]
//   if (BoardConstants.SAFE_CELLS.includesDeep(pos)) {
//     console.log('Safe Cell')
//     return []
//   }
//   const killedTokens: KilledToken[] = []
//   Object.entries(match.players).forEach(([key, player]) => {
//     if (key === currPlayer || killedTokens.length) {
//       return
//     }
//     const tokens = player.tokens
//     for (let i = 0; i < tokens.length; i++) {
//       if (_.isEqual(tokens[i].position, pos)) {
//         killedTokens.push({
//           token: tokens[i],
//           player: key as PlayerColor,
//         })
//       }
//     }
//   })
//   return killedTokens
// }

export const checkTokenKill = (
  match: MatchOffline,
  pathIndex: number
): KilledToken[] => {
  const currPlayer = match.turn
  const pos = BoardConstants.PATH[currPlayer][pathIndex]
  if (BoardConstants.SAFE_CELLS.includesDeep(pos)) {
    console.log('Safe Cell')
    return []
  }
  const killedTokens: KilledToken[] = []
  Object.entries(match.players).forEach(([key, player]) => {
    if (key === currPlayer || killedTokens.length) {
      return
    }
    const tokens = player.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].pathIndex === -1) continue

      if (
        _.isEqual(
          BoardConstants.PATH[key as PlayerColor][tokens[i].pathIndex],
          pos
        )
      ) {
        killedTokens.push({
          move: {
            tokenIndex: tokens[i].index,
            currIndex: tokens[i].pathIndex,
            nextIndex: -1,
            delayInterval: (tokens[i].pathIndex + 1) * 50,
          },
          player: key as PlayerColor,
        })
      }
    }
  })
  return killedTokens
}

const PLAYER_TYPES: PlayerColor[] = ['green', 'yellow', 'blue', 'red']
export const getNextPlayerTurn = (match: MatchOffline) => {
  const currPlayer = match.turn
  let nextPlayer = currPlayer
  for (let i = 0; i < 8; i++) {
    if (PLAYER_TYPES[i] === currPlayer) {
      i++
      while (i < 8) {
        const j = i % 4
        if (match.players[PLAYER_TYPES[j]].isPlaying) {
          nextPlayer = PLAYER_TYPES[j]
          break
        }
        i++
      }
      break
    }
  }
  return nextPlayer
}
