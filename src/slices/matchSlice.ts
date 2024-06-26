import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Token = {
  id: string
  pos: number // position from base, 0 indexed
  canMove: boolean
  color: PlayerName
}

type Player = {
  tokens: Token[]
  isActive?: boolean
}
type PlayerName = keyof MatchState['players'] // red, green, blue, yellow

type MatchState = {
  isOngoing: boolean
  players: {
    red: Player
    green: Player
    blue: Player
    yellow: Player
  }
  dice: number
  canRollDice: boolean
  activePlayers: PlayerName[]
  turn: number
}

const initialState: MatchState = {
  isOngoing: false,
  players: {
    red: { tokens: [], isActive: false },
    green: { tokens: [], isActive: false },
    blue: { tokens: [], isActive: false },
    yellow: { tokens: [], isActive: false },
  },
  dice: 0,
  canRollDice: true,
  activePlayers: [],
  turn: 0, // 0...3
}

/**
 * 1. If any token is in the base and no other move possible (dice + token > 57 ) and dice===6, move token out of the base
 * 2. If only one token is in the path and dice!==6, move token automatically
 */

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    startMatch: (state, action: PayloadAction<{ players: PlayerName[] }>) => {
      if (state.isOngoing) {
        return
      }
      state.isOngoing = true
      for (const p of action.payload.players) {
        state.players[p].isActive = true
        for (let i = 0; i < 4; i++) {
          state.players[p].tokens.push({
            id: `${p}_${i}`,
            pos: -1,
            canMove: false,
            color: p,
          })
        }
      }
      state.activePlayers = action.payload.players
    },
    rollDice: (state) => {
      const num = Math.floor(Math.random() * 6) + 1
      state.dice = num
      state.canRollDice = false
      const currPlayer = state.activePlayers[state.turn]
      const movableTokensIndexes: number[] = []
      const baseTokensIndexes: number[] = []

      for (let i = 0; i < 4; i++) {
        const token = state.players[currPlayer].tokens[i]
        if (
          (token.pos !== -1 && token.pos + num <= 56) ||
          (token.pos === -1 && num === 6)
        ) {
          state.players[currPlayer].tokens[i].canMove = true
          movableTokensIndexes.push(i)
          if (token.pos === -1) {
            // Token at base
            baseTokensIndexes.push(i)
          }
        }
      }
      // console.log({ movableTokensIndexes, baseTokensIndexes })

      if (!movableTokensIndexes.length) {
        nextPlayerTurn(state)
        return
      }

      if (num === 6) {
        if (movableTokensIndexes.length === baseTokensIndexes.length) {
          // Only base tokens can move, take token out of the base
          moveToken(state, movableTokensIndexes[0], 0)
        } else {
          if (movableTokensIndexes.length == 1) {
            // Only ONE movable token is in the path, auto move token
            moveToken(state, movableTokensIndexes[0], num)
          }
        }
      } else {
        // No base tokens can move
        if (movableTokensIndexes.length == 1) {
          // Only one movable token is in the path, auto move token
          moveToken(state, movableTokensIndexes[0], num)
          //TODO:: Kill other player Tokens if possible
          nextPlayerTurn(state)
        }
      }
    },
    move: (state, action: PayloadAction<{ tokenIndex: number }>) => {
      const { activePlayers, turn, dice } = state
      const tokenIndex = action.payload.tokenIndex
      state.players[activePlayers[turn]].tokens[tokenIndex].pos += dice

      resetMovableTokens(state)
      if (state.dice !== 6) {
        nextPlayerTurn(state)
      }
    },
  },
})

const moveToken = (
  state: MatchState,
  tokenIndex: number,
  diceValue: number
) => {
  // console.log({ player, tokenIndex, diceValue })
  const currPlayer = state.activePlayers[state.turn]

  if (diceValue === 0) {
    state.players[currPlayer].tokens[tokenIndex].pos = 0
  } else {
    state.players[currPlayer].tokens[tokenIndex].pos += diceValue
  }
  resetMovableTokens(state)
}

const resetMovableTokens = (state: MatchState) => {
  const currPlayer = state.activePlayers[state.turn]
  for (let i = 0; i < 4; i++) {
    state.players[currPlayer].tokens[i].canMove = false
  }
  state.canRollDice = true
}

const nextPlayerTurn = (state: MatchState) => {
  state.turn = (state.turn + 1) % state.activePlayers.length
  state.canRollDice = true
}

export const { startMatch, move, rollDice } = matchSlice.actions

export default matchSlice.reducer
