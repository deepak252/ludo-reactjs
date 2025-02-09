import { BoardState, MatchStatus } from '@/constants/enums'
import { PlayerColor, Players } from '@/shared.types'

export type MatchOffline = {
  //   _id: string
  //   roomId: string
  //   maxPlayersCount: number
  //   joinedPlayersCount: number
  playersCount: number
  status: MatchStatus
  players: Players
  turn: PlayerColor
  diceValue: number
  //   createdBy: string
  boardState: BoardState
  createdAt?: Date
  //   updatedAt?: Date
}
