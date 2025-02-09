import { BoardState, MatchStatus } from '@/constants/enums'
import { Player, PlayerColor } from '@/shared.types'

export type MatchOnline = {
  _id: string
  roomId: string
  maxPlayersCount: number
  joinedPlayersCount: number
  status: MatchStatus
  players: Record<PlayerColor, Player>
  turn: PlayerColor
  diceValue: number
  createdBy: string
  boardState: BoardState
  createdAt?: Date
  updatedAt?: Date
}
