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
  // board: Record<number, Record<PlayerName, number>>
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
  // board: {},
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
        // const token = {
        //   pos: -1,
        //   canMove: false,
        //   color: p,
        // }
        // state.players[p].tokens = [token, token, token, token]
      }
      // for (let i = 0; i < 225; i++) {
      //   state.board[i] = { red: 0, green: 0, blue: 0, yellow: 0 }
      // }
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
          moveToken(state, currPlayer, movableTokensIndexes[0], 0)
        } else {
          if (movableTokensIndexes.length == 1) {
            // Only ONE movable token is in the path, auto move token
            moveToken(state, currPlayer, movableTokensIndexes[0], num)
          }
        }
      } else {
        // No base tokens can move
        if (movableTokensIndexes.length == 1) {
          // Only one movable token is in the path, auto move token
          moveToken(state, currPlayer, movableTokensIndexes[0], num)
          //TODO:: Kill other player Tokens if possible
          nextPlayerTurn(state)
        }
      }

      // if (num === 6) {
      //   if (movableTokensIndexes.length === baseTokensIndexes.length) {
      //     // Only base tokens can move, take token out of the base
      //     state.players[currPlayer].tokens[movableTokensIndexes[0]].pos = 0
      //   } else {
      //     if (movableTokensIndexes.length == 1) {
      //       // Only ONE movable token is in the path, auto move token
      //       state.players[currPlayer].tokens[movableTokensIndexes[0]].pos += num
      //     }
      //   }
      // } else {
      //   // No base tokens can move
      //   if (movableTokensIndexes.length == 1) {
      //     // Only one movable token is in the path, auto move token
      //     state.players[currPlayer].tokens[movableTokensIndexes[0]].pos += num
      //   }
      // }

      // for (let i = 0; i < 4; i++) {
      //   const token = state.players[currPlayer].tokens[i]
      //   if (
      //     (token.pos !== -1 && token.pos + num <= 56) ||
      //     (token.pos === -1 && num === 6)
      //   ) {
      //     state.players[currPlayer].tokens[i].canMove = true
      //     movableTokensCount++
      //     if (token.pos === -1) {
      //       // Token at base
      //       baseTokensCount++
      //     }
      //   }
      // }

      // const movableTokens = state.players[currPlayer].tokens.filter(
      //   (token) => {
      //     if(token.pos !== -1 && token.pos + num <= 56){

      //     }
      //   }
      // )

      // const isAllBase: boolean =
      //   state.players[currPlayer].tokens.filter(
      //     (t) => t.pos === -1 || t.pos + num > 57
      //   ).length == 4
      // if (isAllBase) {
      //   if (num === 6) {
      //     // Take token out of Base
      //     const i = state.players[currPlayer].tokens.findIndex(
      //       (t) => t.pos === -1
      //     )
      //     if (i != -1) state.players[currPlayer].tokens[i].pos = 0
      //   } else {
      //     state.turn = (turn + 1) % activePlayers.length
      //   }
      //   state.canRollDice = true
      // } else {
      // }
    },
    move: (state, action: PayloadAction<{ token: number }>) => {
      const { activePlayers, turn, dice } = state
      const token = action.payload.token
      state.players[activePlayers[turn]].tokens[token].pos += dice
      if (activePlayers.length) {
        state.turn = (turn + 1) % activePlayers.length
      }
      state.canRollDice = true
    },
  },
})

const moveToken = (
  state: MatchState,
  player: PlayerName,
  tokenIndex: number,
  diceValue: number
) => {
  // console.log({ player, tokenIndex, diceValue })

  if (diceValue === 0) {
    state.players[player].tokens[tokenIndex].pos = 0
  } else {
    state.players[player].tokens[tokenIndex].pos += diceValue
  }
  resetMovableTokens(state, player)
}

const resetMovableTokens = (state: MatchState, player: PlayerName) => {
  for (let i = 0; i < 4; i++) {
    state.players[player].tokens[i].canMove = false
  }
  state.canRollDice = true
}

const nextPlayerTurn = (state: MatchState) => {
  state.turn = (state.turn + 1) % state.activePlayers.length
  state.canRollDice = true
}

export const { startMatch, move, rollDice } = matchSlice.actions

export default matchSlice.reducer
