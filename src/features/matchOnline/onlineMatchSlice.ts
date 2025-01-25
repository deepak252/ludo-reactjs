import { CreateRoomFormValues, ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { signOutSuccess } from '../auth/authSlice'
import { MatchOnline } from './onlineMatch.types'

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

  setOnlineMatchToast,
} = onlineMatchSlice.actions

export default onlineMatchSlice.reducer
