/* eslint-disable @typescript-eslint/no-unused-vars */
// import BoardConstants from '@/constants/boardConstants'
import { BoardState, MatchStatus } from '@/constants/enums'
import { PlayerColor, Position, ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MatchOffline } from './offlineMatch.types'

type OfflineMatchState = {
  match: MatchOffline
  tokenMovementSound: number
  tokenKillSound: number
  toastData?: ToastData | null
}

const initialState: OfflineMatchState = {
  match: {
    playersCount: 0,
    diceValue: 0,
    players: {
      green: { tokens: [], isPlaying: false },
      yellow: { tokens: [], isPlaying: false },
      blue: { tokens: [], isPlaying: false },
      red: { tokens: [], isPlaying: false },
    },
    status: MatchStatus.Waiting,
    boardState: BoardState.RollDice,
    turn: 'green',
  },
  tokenMovementSound: 0,
  tokenKillSound: 0,
}

const offlineMatchSlice = createSlice({
  name: 'matchOffline',
  initialState,
  reducers: {
    setMatchState: (state, action: PayloadAction<MatchOffline>) => {
      state.match = action.payload
    },
    startMatch: (state, action: PayloadAction<{ playersCount: number }>) => {
      if (state.match.status === MatchStatus.InProgress) {
        return
      }
      const { playersCount } = action.payload
      if (playersCount < 2 || playersCount > 4) {
        return
      }
      const playerTypes: PlayerColor[] = ['green']
      if (playersCount >= 3) {
        playerTypes.push('yellow')
      }
      if (playersCount >= 2) {
        playerTypes.push('blue')
      }
      if (playersCount == 4) {
        playerTypes.push('red')
      }
      let j = 1
      for (const player of playerTypes) {
        state.match.players[player].userId = `Player ${j}`
        state.match.players[player].isPlaying = true
        for (let i = 0; i < 4; i++) {
          state.match.players[player].tokens.push({
            id: `${player}_${i}`,
            index: i,
            color: player,
            pathIndex: -1,
          })
        }
        j++
      }
      state.match.status = MatchStatus.InProgress
      state.match.playersCount = playersCount
      console.log('Match started', action.payload)
    },

    rollDice: (_) => {
      console.log('Dice Rolled')
    },
    rollDiceSuccess: (
      state,
      action: PayloadAction<{
        diceValue: number
        // status: BoardState
        // isNextPlayerTurn: boolean
      }>
    ) => {
      console.log('rollDiceSuccess')
      const { diceValue: value } = action.payload
      state.match.diceValue = value
      state.match.boardState = BoardState.TokenMoving

      // const { diceValue: value, status, isNextPlayerTurn } = action.payload
      // state.match.diceValue = value
      // state.match.boardState = status
      // if (isNextPlayerTurn && status === BoardState.RollDice) {
      //   nextPlayerTurn(state.match)
      // }
    },
    rollDiceFailure: (_, action: PayloadAction<{ message?: string }>) => {
      const { message } = action.payload
      console.log('rollDiceFailure: ', message)
    },
    /**
     *  @param position is used to handle click for overlapped tokens
     */
    pickToken: (_, __: PayloadAction<{ position: Position }>) => {
      console.log('Pick Token')
    },
    // pickTokenSuccess: (
    //   state,
    //   action: PayloadAction<{
    //     isNextPlayerTurn: boolean
    //   }>
    // ) => {
    //   console.log('pickTokenSuccess')
    //   const { isNextPlayerTurn } = action.payload
    //   state.match.boardState = BoardState.RollDice
    //   if (isNextPlayerTurn) {
    //     nextPlayerTurn(state.match)
    //   }
    // },
    pickTokenFailure: (_, action: PayloadAction<{ message: string }>) => {
      const { message } = action.payload
      console.log('pickTokenFailure: ', message)
    },
    moveToken: (
      state,
      action: PayloadAction<{ tokenIndex: number; pathIndex: number }>
    ) => {
      console.log('moveToken')
      const { tokenIndex, pathIndex } = action.payload
      const currPlayer = state.match.turn
      state.match.boardState = BoardState.TokenMoving
      state.match.players[currPlayer].tokens[tokenIndex].pathIndex = pathIndex
      // state.match.players[currPlayer].tokens[tokenIndex].position =
      //   BoardConstants.PATH[currPlayer][pathIndex]
      state.tokenMovementSound++
    },
    tokenMoveSuccess: (state) => {
      state.tokenMovementSound = 0
    },

    killToken: (
      state,
      action: PayloadAction<{
        player: PlayerColor
        tokenIndex: number
        pathIndex: number
      }>
    ) => {
      console.log('killToken')
      const { player, tokenIndex, pathIndex } = action.payload
      state.match.players[player].tokens[tokenIndex].pathIndex = pathIndex
    },
    tokenKillSound: (state) => {
      state.tokenKillSound++
    },
    tokenKillSuccess: (state) => {
      state.tokenKillSound = 0
    },

    setHighlightTokens: (
      state,
      action: PayloadAction<{ tokenIndexes?: number[]; highlight: boolean }>
    ) => {
      console.log('highlightTokens')
      const currPlayer = state.match.turn
      const { tokenIndexes, highlight } = action.payload
      if (highlight) {
        if (tokenIndexes?.length) {
          for (const i of tokenIndexes) {
            state.match.players[currPlayer].tokens[i].highlight = highlight
          }
        }
      } else {
        for (let i = 0; i < 4; i++) {
          state.match.players[currPlayer].tokens[i].highlight = false
        }
      }
    },
    setOfflineBoardState: (state, action: PayloadAction<BoardState>) => {
      state.match.boardState = action.payload
    },

    setPlayerTurn: (state, action: PayloadAction<PlayerColor>) => {
      state.match.turn = action.payload
    },

    resetOfflineMatchState: (state) => {
      return {
        ...initialState,
        toastData: state.toastData,
      }
    },
  },
})

// const PLAYER_TYPES: PlayerColor[] = ['green', 'yellow', 'blue', 'red']

// const nextPlayerTurn = (state: MatchOffline) => {
//   const currPlayer = state.turn
//   let nextPlayer = currPlayer
//   for (let i = 0; i < 8; i++) {
//     if (PLAYER_TYPES[i] === currPlayer) {
//       i++
//       while (i < 8) {
//         const j = i % 4
//         if (state.players[PLAYER_TYPES[j]].isPlaying) {
//           nextPlayer = PLAYER_TYPES[j]
//           break
//         }
//         i++
//       }
//       break
//     }
//   }
//   state.turn = nextPlayer
// }

// export const getNextPlayerTurn = (match: MatchOffline) => {
//   const currPlayer = match.turn
//   let nextPlayer = currPlayer
//   for (let i = 0; i < 8; i++) {
//     if (PLAYER_TYPES[i] === currPlayer) {
//       i++
//       while (i < 8) {
//         const j = i % 4
//         if (match.players[PLAYER_TYPES[j]].isPlaying) {
//           nextPlayer = PLAYER_TYPES[j]
//           break
//         }
//         i++
//       }
//       break
//     }
//   }
//   return nextPlayer
// }

export const {
  startMatch,
  setMatchState,

  rollDice,
  rollDiceSuccess,
  rollDiceFailure,

  pickToken,
  pickTokenFailure,
  // pickTokenSuccess,
  moveToken,

  tokenMoveSuccess,

  killToken,
  tokenKillSound,
  tokenKillSuccess,

  setHighlightTokens,
  setOfflineBoardState,
  setPlayerTurn,
  resetOfflineMatchState,
} = offlineMatchSlice.actions

export default offlineMatchSlice.reducer

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { PlayerTypes } from '@/constants'
// import BoardConstants from '@/constants/boardConstants'
// import { BoardState } from '@/constants/enums'
// import { KilledToken, PlayerColor, Position, TokenInfo } from '@/shared.types'
// import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// type Player = {
//   tokens: TokenInfo[]
//   isActive: boolean
// }

// export type OfflineMatchState = {
//   isOngoing: boolean
//   players: Record<PlayerColor, Player>
//   turn: PlayerColor
//   dice: { value: number }
//   boardState?: BoardState
// }

// const initialState: OfflineMatchState = {
//   isOngoing: false,
//   players: {
//     red: { tokens: [], isActive: false },
//     green: { tokens: [], isActive: false },
//     blue: { tokens: [], isActive: false },
//     yellow: { tokens: [], isActive: false },
//   },
//   dice: { value: 0 },
//   turn: 'green',
// }

// const offlineMatchSlice = createSlice({
//   name: 'matchOffline',
//   initialState,
//   reducers: {
//     startMatch: (state, action: PayloadAction<{ playerCount: number }>) => {
//       if (state.isOngoing) {
//         return
//       }
//       state.isOngoing = true
//       const { playerCount } = action.payload
//       if (playerCount < 2 || playerCount > 4) {
//         return
//       }
//       const playerTypes: PlayerColor[] = []
//       playerTypes.push('green')
//       if (playerCount >= 2) {
//         playerTypes.push('blue')
//       }
//       if (playerCount >= 3) {
//         playerTypes.push('yellow')
//       }
//       if (playerCount == 4) {
//         playerTypes.push('red')
//       }
//       for (const playerType of playerTypes) {
//         state.players[playerType].isActive = true
//         for (let i = 0; i < 4; i++) {
//           state.players[playerType].tokens.push({
//             id: `${playerType}_${i}`,
//             index: i,
//             color: playerType,
//             pathIndex: -1,
//             position: BoardConstants.HOME[playerType][i],
//           })
//         }
//       }
//       state.turn = 'green'
//       state.boardState = BoardState.RollDice
//       console.log('Match started', action.payload)
//     },

//     throwDice: (_) => {
//       console.log('Dice Thrown')
//     },
//     throwDiceSuccess: (
//       state,
//       action: PayloadAction<{
//         diceValue: number
//         status: BoardState
//         isNextPlayerTurn: boolean
//       }>
//     ) => {
//       const { diceValue: value, status, isNextPlayerTurn } = action.payload
//       state.dice = { value }
//       // state.boardState = BoardState.pickToken
//       state.boardState = status
//       if (isNextPlayerTurn && status === BoardState.RollDice) {
//         nextPlayerTurn(state)
//       }
//       console.log('throwDiceSuccess')
//     },
//     throwDiceFailure: (_, action: PayloadAction<{ message?: string }>) => {
//       const { message } = action.payload
//       console.log('throwDiceFailure: ', message)
//     },
//     /**
//      *  @param position is used to handle click for overlapped tokens
//      */
//     pickToken: (_, __: PayloadAction<{ position: Position }>) => {
//       console.log('Pick Token')
//     },
//     pickTokenSuccess: (
//       state,
//       action: PayloadAction<{
//         isNextPlayerTurn: boolean
//       }>
//     ) => {
//       console.log('pickTokenSuccess')
//       const { isNextPlayerTurn } = action.payload
//       state.boardState = BoardState.RollDice
//       if (isNextPlayerTurn) {
//         nextPlayerTurn(state)
//       }
//     },
//     pickTokenFailure: (_, action: PayloadAction<{ message: string }>) => {
//       const { message } = action.payload
//       console.log('pickTokenFailure: ', message)
//     },
//     moveToken: (
//       state,
//       action: PayloadAction<{ tokenIndex: number; pathIndex: number }>
//     ) => {
//       console.log('moveToken')
//       const { tokenIndex, pathIndex } = action.payload
//       const currPlayer = state.turn
//       state.boardState = BoardState.TokenMoving
//       state.players[currPlayer].tokens[tokenIndex].pathIndex = pathIndex
//       state.players[currPlayer].tokens[tokenIndex].position =
//         BoardConstants.PATH[currPlayer][pathIndex]
//     },
//     killTokens: (
//       state,
//       action: PayloadAction<{ killedTokens: KilledToken[] }>
//     ) => {
//       console.log('killTokens')
//       const killedTokens = action.payload.killedTokens
//       killedTokens.forEach((killedToken) => {
//         const { token, player } = killedToken
//         state.players[player].tokens[token.index].pathIndex = -1
//         state.players[player].tokens[token.index].position =
//           BoardConstants.HOME[player][token.index]
//       })
//     },
//     setHighlightTokens: (
//       state,
//       action: PayloadAction<{ tokenIndexes?: number[]; highlight: boolean }>
//     ) => {
//       console.log('highlightTokens')
//       const currPlayer = state.turn
//       const { tokenIndexes, highlight } = action.payload
//       if (highlight) {
//         if (tokenIndexes?.length) {
//           for (const i of tokenIndexes) {
//             state.players[currPlayer].tokens[i].highlight = highlight
//           }
//         }
//       } else {
//         for (let i = 0; i < 4; i++) {
//           state.players[currPlayer].tokens[i].highlight = false
//         }
//       }
//     },
//     setStatus: (state, action: PayloadAction<BoardState>) => {
//       state.boardState = action.payload
//     },
//   },
// })

// const nextPlayerTurn = (state: OfflineMatchState) => {
//   const currPlayer = state.turn
//   let nextPlayer = currPlayer
//   for (let i = 0; i < 8; i++) {
//     if (PlayerTypes[i] === currPlayer) {
//       i++
//       while (i < 8) {
//         const j = i % 4
//         if (state.players[PlayerTypes[j]].isActive) {
//           nextPlayer = PlayerTypes[j]
//           break
//         }
//         i++
//       }
//       break
//     }
//   }
//   state.turn = nextPlayer
// }

// export const {
//   startMatch,

//   throwDice,
//   throwDiceSuccess,
//   throwDiceFailure,

//   pickToken,
//   pickTokenFailure,
//   pickTokenSuccess,
//   moveToken,

//   killTokens,
//   setHighlightTokens,
//   setStatus,
// } = offlineMatchSlice.actions

// export default offlineMatchSlice.reducer
