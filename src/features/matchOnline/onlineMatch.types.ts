import { BoardState, MatchStatus } from '@/constants/enums'
import { Player, PlayerColor } from '@/shared.types'

// export type TokenMove = {
//   currIndex: number
//   nextIndex: number
//   delayInterval: number
// }

// export type TokenInfo = {
//   id: string
//   index: number
//   color: PlayerColor
//   pathIndex: number
//   // position: Position
//   highlight?: boolean
// }

// export type KilledToken = {
//   token: TokenInfo
//   player: PlayerColor
// }

// export type Player = {
//   userId?: string | null
//   tokens: TokenInfo[]
//   isPlaying: boolean
// }

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
