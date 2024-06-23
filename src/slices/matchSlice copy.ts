// import { HOME } from '@/constants'
// import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// type Player = {
//   tokens: number[]
//   isActive?: boolean
// }
// type PlayerType = keyof MatchState['players']

// type MatchState = {
//   players: {
//     red: Player
//     green: Player
//     blue: Player
//     yellow: Player
//   }
//   dice: number
//   canRollDice: boolean
//   activePlayers: PlayerType[]
//   turn: number
// }

// const initialState: MatchState = {
//   players: {
//     red: { tokens: new Array(4), isActive: false },
//     green: { tokens: new Array(4), isActive: false },
//     blue: { tokens: new Array(4), isActive: false },
//     yellow: { tokens: new Array(4), isActive: false },
//   },
//   dice: 0,
//   canRollDice: true,
//   activePlayers: [],
//   turn: 0, // 0...3
// }

// /**
//  * 1. If any token is in the base and no other move possible (dice + token > 57 ) and dice===6, move token out of the base
//  * 2. If only one token is in the path and dice!==6, move token automatically
//  */

// const matchSlice = createSlice({
//   name: 'match',
//   initialState,
//   reducers: {
//     startMatch: (state, action: PayloadAction<{ players: PlayerType[] }>) => {
//       for (const p of action.payload.players) {
//         state.players[p].isActive = true
//         state.players[p].tokens = [-1, -1, -1, -1]
//       }
//       state.activePlayers = action.payload.players
//     },
//     rollDice: (state) => {
//       const { activePlayers, turn } = state
//       const num = Math.floor(Math.random() * 7)
//       state.dice = num
//       state.canRollDice = false
//       const currPlayer = state.activePlayers[state.turn]
//       const isAllBase: boolean =
//         state.players[currPlayer].tokens.filter((t) => t === -1 || t + num > 57)
//           .length == 4
//       if (isAllBase) {
//         if (num === 6) {
//           const i = state.players[currPlayer].tokens.findIndex((t) => t === -1)
//           if (i != -1) state.players[currPlayer].tokens[i] = 0
//         } else {
//           state.turn = (turn + 1) % activePlayers.length
//         }
//         state.canRollDice = true
//       }
//     },
//     move: (state, action: PayloadAction<{ token: number }>) => {
//       const { activePlayers, turn, dice } = state
//       const token = action.payload.token
//       state.players[activePlayers[turn]].tokens[token] += dice
//       if (activePlayers.length) {
//         state.turn = (turn + 1) % activePlayers.length
//       }
//       state.canRollDice = true
//     },
//   },
// })

// export const { startMatch, move, rollDice } = matchSlice.actions

// export default matchSlice.reducer
