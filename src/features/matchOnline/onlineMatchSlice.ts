import { CreateRoomFormValues, ToastData, TokenMove } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signOutSuccess } from '../auth/authSlice'
import { MatchOnline } from './onlineMatch.types'
import BoardConstants from '@/constants/boardConstants'

type OnlineMatchState = {
  room: {
    isLoading: boolean
    match?: MatchOnline
  }
  ongoingMatch: {
    data?: MatchOnline
    isLoading: boolean
  }
  matchHistory: {
    list: MatchOnline[]
    isLoading: boolean
  }
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
    joinMatchSuccess: (state, action: PayloadAction<MatchOnline>) => {
      state.room.isLoading = false
      state.room.match = action.payload
    },
    joinMatchFailure: (state, action) => {
      state.room.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
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
      // state.room.match.boardState = BoardState.TokenMoving
      state.room.match.players[currPlayer].tokens[tokenIndex].pathIndex =
        pathIndex
      state.room.match.players[currPlayer].tokens[tokenIndex].position =
        BoardConstants.PATH[currPlayer][pathIndex]
    },
    tokenMoved: (_, __: PayloadAction<TokenMove>) => {},

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

  getOngoingMatch,
  getOngoingMatchSuccess,
  getMatchHistoryFailure,

  getMatchHistory,
  getMatchHistorySuccess,
  getOngoingMatchFailure,

  rollDice,
  rollDiceFailure,

  moveToken,
  tokenMoved,

  setMatchState,

  setOnlineMatchToast,
} = onlineMatchSlice.actions

export default onlineMatchSlice.reducer
