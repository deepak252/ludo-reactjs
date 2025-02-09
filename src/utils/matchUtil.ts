import BoardConstants from '@/constants/boardConstants'
import { PlayerColor, Players, Position } from '@/shared.types'
import _ from 'lodash'

export const getTokenPosition = (
  color: PlayerColor,
  tokenIndex: number,
  pathIndex: number
) => {
  if (pathIndex === -1 && tokenIndex >= 0 && tokenIndex < 4) {
    return BoardConstants.HOME[color][tokenIndex]
  } else if (pathIndex >= 0 && pathIndex < 56) {
    return BoardConstants.PATH[color][pathIndex]
  }
  return []
}

/**
 * Check if token is present at selected position, return token index
 * @param position
 * @returns token index if present at position, otherwise -1
 */
export const checkTokenPresent = (
  players: Players,
  turn: PlayerColor,
  position: Position
) => {
  for (let i = 0; i < 4; i++) {
    if (
      _.isEqual(
        getTokenPosition(turn, i, players[turn].tokens[i].pathIndex),
        position
      )
    ) {
      return i
    }
  }
  return -1
}
