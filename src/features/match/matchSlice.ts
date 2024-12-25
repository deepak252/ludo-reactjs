/* eslint-disable @typescript-eslint/no-unused-vars */
import { LudoStatus, PlayerTypes } from '@/constants'
import BoardConstants from '@/constants/boardConstants'
import { KilledToken, PlayerType, Position, TokenInfo } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Player = {
  tokens: TokenInfo[]
  isActive: boolean
}

export type MatchState = {
  isOngoing: boolean
  players: Record<PlayerType, Player>
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

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
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
            index: i,
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

    throwDice: (_) => {
      console.log('Dice Thrown')
    },
    throwDiceSuccess: (
      state,
      action: PayloadAction<{
        diceValue: number
        status: LudoStatus
        isNextPlayerTurn: boolean
      }>
    ) => {
      const { diceValue: value, status, isNextPlayerTurn } = action.payload
      state.dice = { value }
      // state.status = LudoStatus.pickToken
      state.status = status
      if (isNextPlayerTurn && status === LudoStatus.throwDice) {
        nextPlayerTurn(state)
      }
      console.log('throwDiceSuccess')
    },
    throwDiceFailure: (_, action: PayloadAction<{ message?: string }>) => {
      const { message } = action.payload
      console.log('throwDiceFailure: ', message)
    },
    /**
     *  @param position is used to hancle click for overlapped tokens
     */
    pickToken: (_, __: PayloadAction<{ position: Position }>) => {
      console.log('Pick Token')
    },
    pickTokenSuccess: (
      state,
      action: PayloadAction<{
        isNextPlayerTurn: boolean
      }>
    ) => {
      console.log('pickTokenSuccess')
      const { isNextPlayerTurn } = action.payload
      state.status = LudoStatus.throwDice
      if (isNextPlayerTurn) {
        nextPlayerTurn(state)
      }
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
      state.status = LudoStatus.moving
      state.players[currPlayer].tokens[tokenIndex].pathIndex = pathIndex
      state.players[currPlayer].tokens[tokenIndex].position =
        BoardConstants.PATH[currPlayer][pathIndex]
    },
    killTokens: (
      state,
      action: PayloadAction<{ killedTokens: KilledToken[] }>
    ) => {
      console.log('killTokens')
      const killedTokens = action.payload.killedTokens
      killedTokens.forEach((killedToken) => {
        const { token, player } = killedToken
        state.players[player].tokens[token.index].pathIndex = -1
        state.players[player].tokens[token.index].position =
          BoardConstants.HOME[player][token.index]
      })
    },
    setHighlightTokens: (
      state,
      action: PayloadAction<{ tokenIndexes?: number[]; highlight: boolean }>
    ) => {
      console.log('highlightTokens')
      const currPlayer = state.turn
      const { tokenIndexes, highlight } = action.payload
      if (highlight) {
        if (tokenIndexes?.length) {
          for (const i of tokenIndexes) {
            state.players[currPlayer].tokens[i].highlight = highlight
          }
        }
      } else {
        for (let i = 0; i < 4; i++) {
          state.players[currPlayer].tokens[i].highlight = false
        }
      }
    },
    setStatus: (state, action: PayloadAction<LudoStatus>) => {
      state.status = action.payload
    },
  },
})

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
  startMatch,

  throwDice,
  throwDiceSuccess,
  throwDiceFailure,

  pickToken,
  pickTokenFailure,
  pickTokenSuccess,
  moveToken,

  killTokens,
  setHighlightTokens,
  setStatus,
} = matchSlice.actions

export default matchSlice.reducer
