/* eslint-disable @typescript-eslint/no-unused-vars */
import { DICE_VALUES, LudoStatus, PlayerTypes } from '@/constants'
import BoardConstants from '@/constants/boardConstants'
import { LudoColor, PlayerType, Position } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

type Token = {
  id: string
  color: LudoColor
  pathIndex: number
  position: Position
}

type Player = {
  tokens: Token[]
  isActive: boolean
}

export type MatchState = {
  isOngoing: boolean
  players: {
    green: Player
    yellow: Player
    blue: Player
    red: Player
  }
  // turn: 0 | 1 | 2 | 3
  turn: PlayerType
  dice: { value: number }
  status?: LudoStatus
}

const initialState: MatchState = {
  isOngoing: false,
  players: {
    red: { tokens: [], isActive: false },
    green: { tokens: [], isActive: false },
    blue: { tokens: [], isActive: false },
    yellow: { tokens: [], isActive: false },
  },
  dice: { value: 0 },
  turn: 'green',
}

/**
 * 1. If any token is in the base and no other move possible (dice + token > 57 ) and dice===6, move token out of the base
 * 2. If only one token is in the path and dice!==6, move token automatically
 */
const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    cellClicked: (_, action: PayloadAction<{ position: Position }>) => {
      console.log('Cell Clicked', action.payload)
    },
    startMatch: (state, action: PayloadAction<{ playerCount: number }>) => {
      if (state.isOngoing) {
        return
      }
      state.isOngoing = true
      const { playerCount } = action.payload
      if (playerCount < 2 || playerCount > 4) {
        return
      }
      const playerTypes: PlayerType[] = []
      playerTypes.push('green')
      if (playerCount >= 2) {
        playerTypes.push('blue')
      }
      if (playerCount >= 3) {
        playerTypes.push('yellow')
      }
      if (playerCount == 4) {
        playerTypes.push('red')
      }
      for (const playerType of playerTypes) {
        state.players[playerType].isActive = true
        for (let i = 0; i < 4; i++) {
          state.players[playerType].tokens.push({
            id: `${playerType}_${i}`,
            color: playerType,
            pathIndex: -1,
            position: BoardConstants.HOME[playerType][i],
          })
        }
      }
      state.turn = 'green'
      state.status = LudoStatus.throwDice
      console.log('Match started', action.payload)
    },

    throwDice: (state) => {
      // if (!state.isOngoing || state.status !== LudoStatus.throwDice) {
      //   return
      // }
      //// const value = Math.floor(Math.random() * 6) + 1
      // const di = Math.floor(Math.random() * DICE_VALUES.length)
      // state.dice = { value: DICE_VALUES[di] }
      // state.status = LudoStatus.pickToken
      console.log('Dice Rolled')
    },
    throwDiceSuccess: (state, action: PayloadAction<{ diceValue: number }>) => {
      const { diceValue: value } = action.payload
      state.dice = { value }
      state.status = LudoStatus.pickToken
      console.log('throwDiceSuccess')
    },
    throwDiceFailure: (
      state,
      action: PayloadAction<{ diceValue?: number; message?: string }>
    ) => {
      const { diceValue: value, message } = action.payload
      if (value) {
        state.dice = { value }
        state.status = LudoStatus.throwDice
        nextPlayerTurn(state)
      }
      console.log('throwDiceFailure: ', message)
    },

    pickToken: (state, action: PayloadAction<{ position: Position }>) => {
      // if (!state.isOngoing || state.status !== LudoStatus.pickToken) {
      //   return
      // }
      // const { position } = action.payload
      // const i = checkTokenPresent(state, position)
      // if (i === -1) {
      //   console.log('Token not present at this position')
      //   return
      // }
      // if (!moveToken(state, i)) {
      //   console.log('Invalid Token move')
      //   return
      // }
      //// state.status = LudoStatus.throwDice
      //// nextPlayerTurn(state)
    },
    pickTokenSuccess: (state) => {
      console.log('pickTokenSuccess')
      state.status = LudoStatus.throwDice
      nextPlayerTurn(state)
    },
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
      const currPlayer = state.turn
      state.players[currPlayer].tokens[tokenIndex].pathIndex = pathIndex
      state.players[currPlayer].tokens[tokenIndex].position =
        BoardConstants.PATH[currPlayer][pathIndex]
    },
  },
})

// /**
//  * @param index : Token index
//  */
// const moveToken = (state: MatchState, index: number) => {
//   const currPlayer = state.turn
//   const diceValue = state.dice.value
//   const token = { ...state.players[currPlayer].tokens[index] }
//   if (token.pathIndex === -1) {
//     if (diceValue === 6) {
//       token.pathIndex = 0
//     } else {
//       return false
//     }
//   } else {
//     if (token.pathIndex + diceValue <= 56) {
//       token.pathIndex += diceValue
//     } else {
//       return false
//     }
//   }
//   token.position = BoardConstants.PATH[currPlayer][token.pathIndex]
//   state.players[currPlayer].tokens[index] = token
//   console.log(token)

//   return true
// }
//// Return token index at position
// const checkTokenPresent = (state: MatchState, position: Position) => {
//   const currPlayer = state.turn
//   const tokens = state.players[currPlayer].tokens
//   for (let i = 0; i < 4; i++) {
//     if (_.isEqual(tokens[i].position, position)) {
//       return i
//     }
//   }
//   return -1
//   // for (const token of tokens) {
//   //   if (_.isEqual(token.position, position)) {
//   //     return true
//   //   }
//   // }
//   // return false
// }

const nextPlayerTurn = (state: MatchState) => {
  const currPlayer = state.turn
  let nextPlayer = currPlayer
  for (let i = 0; i < 8; i++) {
    if (PlayerTypes[i] === currPlayer) {
      i++
      while (i < 8) {
        const j = i % 4
        if (state.players[PlayerTypes[j]].isActive) {
          nextPlayer = PlayerTypes[j]
          break
        }
        i++
      }
      break
    }
  }
  state.turn = nextPlayer
}

export const {
  cellClicked,
  startMatch,
  throwDice,
  throwDiceSuccess,
  throwDiceFailure,
  pickToken,
  pickTokenFailure,
  pickTokenSuccess,
  moveToken,
} = matchSlice.actions

export default matchSlice.reducer
