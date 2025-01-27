import {
  CreateRoomFormError,
  CreateRoomFormValues,
  PlayerColor,
  Position,
} from '@/shared.types'
import { MatchOnline } from './onlineMatch.types'
import _ from 'lodash'
import BoardConstants from '@/constants/boardConstants'

export const validateCreateOnlineMatchForm = (values: CreateRoomFormValues) => {
  const errors: CreateRoomFormError = {}

  if (!values.maxPlayersCount) {
    errors.maxPlayersCount = 'Select no. of players'
  }
  // console.log('validate', errors.maxPlayersCount)
  return errors
}

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
export const checkTokenPresent = (state: MatchOnline, position: Position) => {
  const currPlayer = state.turn
  const tokens = state.players[currPlayer].tokens
  for (let i = 0; i < 4; i++) {
    if (
      _.isEqual(getTokenPosition(currPlayer, i, tokens[i].pathIndex), position)
    ) {
      return i
    }
  }
  return -1
}
