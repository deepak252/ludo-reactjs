import offlineMatchSlice from '../features/matchOffline/offlineMatchSlice'
import authSlice from '../features/auth/authSlice'

export const rootReducer = {
  matchOffline: offlineMatchSlice,
  auth: authSlice,
}
