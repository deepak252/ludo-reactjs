import {
  CreateRoomFormValues,
  KilledToken,
  PlayerColor,
  Position,
  ToastData,
  TokenMove,
} from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signOutSuccess } from '../auth/authSlice'
import { MatchOnline } from './onlineMatch.types'

type OnlineMatchState = {
  room: {
    isLoading: boolean
    match?: MatchOnline
    currUserColor?: PlayerColor
  }
  ongoingMatch: {
    data?: MatchOnline
    isLoading: boolean
  }
  matchHistory: {
    list: MatchOnline[]
    isLoading: boolean
  }
  tokenMovementSound: number
  tokenKillSound: number
  toastData?: ToastData | null
}

const initialState: OnlineMatchState = {
  room: {
    isLoading: false,
  },
  ongoingMatch: {
    isLoading: false,
  },
  matchHistory: {
    list: [],
    isLoading: false,
  },
  tokenMovementSound: 0,
  tokenKillSound: 0,
}

const onlineMatchSlice = createSlice({
  name: 'matchOnline',
  initialState,
  reducers: {
    connectOnlineMatch: () => {},

    createMatch: (state, _: PayloadAction<CreateRoomFormValues>) => {
      state.room.isLoading = true
    },
    createMatchSuccess: (state, action: PayloadAction<MatchOnline>) => {
      state.room.isLoading = false
      state.room.match = action.payload
    },
    createMatchFailure: (state, action) => {
      state.room.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    joinMatch: (state, _: PayloadAction<{ roomId: string }>) => {
      state.room.isLoading = true
    },
    joinMatchSuccess: (
      state,
      action: PayloadAction<{
        match: MatchOnline
        currUserId?: string
      }>
    ) => {
      const { match, currUserId } = action.payload
      state.room.isLoading = false
      state.room.match = match

      const players = match.players

      if (!players || !currUserId) return
      state.room.currUserColor = Object.keys(players).find(
        (key) => players[key as PlayerColor].userId === currUserId
      ) as PlayerColor
    },
    joinMatchFailure: (state, action) => {
      state.room.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },
    resetMatch: (state) => {
      state.room = initialState.room
    },

    getOngoingMatch: (state) => {
      state.ongoingMatch.isLoading = true
    },
    getOngoingMatchSuccess: (state, action: PayloadAction<MatchOnline>) => {
      state.ongoingMatch.isLoading = false
      state.ongoingMatch.data = action.payload
    },
    getOngoingMatchFailure: (state, action) => {
      state.ongoingMatch.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    getMatchHistory: (state) => {
      state.matchHistory.isLoading = true
    },
    getMatchHistorySuccess: (state, action: PayloadAction<MatchOnline[]>) => {
      state.matchHistory.isLoading = false
      state.matchHistory.list = action.payload
    },
    getMatchHistoryFailure: (state, action) => {
      state.matchHistory.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    rollDice: () => {},
    pickToken: (
      _,
      __: PayloadAction<{ tokenIndex: number; position?: Position }>
    ) => {},
    // diceRolling: (state) => {
    //   if (!state.room.match) return
    //   state.room.match.boardState = BoardState.DiceRolling
    // },
    // diceRolled: (state, action: PayloadAction<{ diceValue: number }>) => {
    //   if (!state.room.match) return
    //   state.room.match.diceValue = action.payload.diceValue
    // },
    rollDiceFailure: (state, action) => {
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    moveToken: (
      state,
      action: PayloadAction<{ tokenIndex: number; pathIndex: number }>
    ) => {
      if (!state.room.match) return
      console.log('moveToken')
      const { tokenIndex, pathIndex } = action.payload
      const currPlayer = state.room.match.turn
      state.room.match.players[currPlayer].tokens[tokenIndex].pathIndex =
        pathIndex
      state.tokenMovementSound++
    },
    tokenMoved: (state, _: PayloadAction<TokenMove>) => {
      if (!state.room.match) return
      // Unhighlight token
      const currPlayer = state.room.match.turn
      for (let i = 0; i < 4; i++) {
        state.room.match.players[currPlayer].tokens[i].highlight = false
      }
    },
    tokenMoveCompleted: (state) => {
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
      if (!state.room.match) return
      console.log('killToken')
      const { player, tokenIndex, pathIndex } = action.payload
      state.room.match.players[player].tokens[tokenIndex].pathIndex = pathIndex
    },
    tokenKilled: (state, _: PayloadAction<KilledToken[]>) => {
      state.tokenKillSound++
    },
    tokenKillCompleted: (state) => {
      state.tokenKillSound = 0
    },

    setMatchState: (state, action: PayloadAction<Partial<MatchOnline>>) => {
      if (!state.room.match) return
      state.room.match = {
        ...state.room.match,
        ...action.payload,
      }
    },

    setOnlineMatchToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
  },
  extraReducers: (builder) =>
    builder.addCase(signOutSuccess, () => initialState),
})

export const {
  connectOnlineMatch,

  createMatch,
  createMatchSuccess,
  createMatchFailure,

  joinMatch,
  joinMatchSuccess,
  joinMatchFailure,
  resetMatch,

  getOngoingMatch,
  getOngoingMatchSuccess,
  getMatchHistoryFailure,

  getMatchHistory,
  getMatchHistorySuccess,
  getOngoingMatchFailure,

  rollDice,
  rollDiceFailure,

  pickToken,

  moveToken,
  tokenMoved,
  tokenMoveCompleted,

  killToken,
  tokenKilled,
  tokenKillCompleted,

  setMatchState,

  setOnlineMatchToast,
} = onlineMatchSlice.actions

export default onlineMatchSlice.reducer
