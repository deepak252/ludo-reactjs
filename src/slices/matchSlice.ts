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
      const movableTokenNumbers: number[] = []
      const baseTokenNumbers: number[] = []

      for (let i = 0; i < 4; i++) {
        const token = state.players[currPlayer].tokens[i]
        if (
          (token.pos !== -1 && token.pos + num <= 56) ||
          (token.pos === -1 && num === 6)
        ) {
          state.players[currPlayer].tokens[i].canMove = true
          movableTokenNumbers.push(i)
          if (token.pos === -1) {
            // Token at base
            baseTokenNumbers.push(i)
          }
        }
      }
      // console.log({ movableTokenNumbers, baseTokenNumbers })

      if (!movableTokenNumbers.length) {
        nextPlayerTurn(state)
        return
      }

      if (num === 6) {
        if (movableTokenNumbers.length === baseTokenNumbers.length) {
          // Only base tokens can move, take token out of the base
          moveToken(state, movableTokenNumbers[0])
        } else {
          if (movableTokenNumbers.length == 1) {
            // Only ONE movable token is in the path, auto move token
            moveToken(state, movableTokenNumbers[0])
          }
        }
      } else {
        // No base tokens can move
        if (movableTokenNumbers.length == 1) {
          // Only one movable token is in the path, auto move token
          moveToken(state, movableTokenNumbers[0])
          //TODO:: Kill other player Tokens if possible
          // nextPlayerTurn(state)
        }
      }
    },
    move: (state, action: PayloadAction<{ tokenNumber: number }>) => {
      // const { activePlayers, turn, dice } = state
      const tokenNumber = action.payload.tokenNumber
      moveToken(state, tokenNumber)
    },
  },
})

const moveToken = (state: MatchState, tokenNumber: number) => {
  const { players, activePlayers, turn, dice } = state

  const currPlayer = activePlayers[turn]
  const tokenPos = players[currPlayer].tokens[tokenNumber].pos

  if (tokenPos === -1 && dice === 6) {
    state.players[currPlayer].tokens[tokenNumber].pos = 0
  } else {
    state.players[currPlayer].tokens[tokenNumber].pos += dice
    nextPlayerTurn(state)
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
