import { LudoState, MatchStatus } from '@/constants/enums'

export type LudoColor = 'green' | 'yellow' | 'blue' | 'red'
export type PlayerType = 'green' | 'yellow' | 'blue' | 'red'

export type TokenMove = {
  currIndex: number
  nextIndex: number
  delayInterval: number
}

export type TokenInfo = {
  id: string
  index: number
  color: LudoColor
  pathIndex: number
  // position: Position
  highlight?: boolean
}

export type KilledToken = {
  token: TokenInfo
  player: PlayerType
}

export type Player = {
  username?: string | null
  tokens: TokenInfo[]
  isPlaying: boolean
}

export type MatchState = {
  roomId: string
  maxPlayersCount: number
  joinedPlayersCount: number
  status: MatchStatus
  players: Record<PlayerType, Player>
  turn: PlayerType
  diceValue: number
  createdBy: string
  ludoState?: LudoState
}
