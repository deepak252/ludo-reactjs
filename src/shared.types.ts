export type Position = [number, number]

export type PlayerColor = 'green' | 'yellow' | 'blue' | 'red'

export type Players = Record<PlayerColor, Player>

export type TokenMove = {
  tokenIndex: number
  currIndex: number
  nextIndex: number
  delayInterval: number
}

export type TokenInfo = {
  id: string
  index: number
  color: PlayerColor
  pathIndex: number
  position?: Position
  highlight?: boolean
}

export type KilledToken = {
  // token: TokenInfo
  move: TokenMove
  player: PlayerColor
}

export type Player = {
  userId?: string | null
  tokens: TokenInfo[]
  isPlaying: boolean
}

// export type TokenMove = {
//   currIndex: number
//   nextIndex: number
// }

// export type TokenInfo = {
//   id: string
//   index: number
//   color: LudoColor
//   pathIndex: number
//   position: Position
//   highlight?: boolean
// }

// export type KilledToken = {
//   token: TokenInfo
//   player: PlayerColor
// }

export type ToastData = {
  type?: 'success' | 'failure' | 'message' | null
  message?: string | null
}

export type CreateRoomFormValues = {
  maxPlayersCount?: 2 | 3 | 4
  users?: string[]
}
export type CreateRoomFormError = {
  maxPlayersCount?: string
  users?: string
}
