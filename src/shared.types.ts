export type Position = [number, number]

export type LudoColor = 'green' | 'yellow' | 'blue' | 'red'

export type PlayerType = 'green' | 'yellow' | 'blue' | 'red'

export type TokenMove = {
  currIndex: number
  nextIndex: number
}

export type TokenInfo = {
  id: string
  index: number
  color: LudoColor
  pathIndex: number
  position: Position
  highlight?: boolean
}

export type KilledToken = {
  token: TokenInfo
  player: PlayerType
}
