import offlineMatchSlice from '../features/matchOffline/offlineMatchSlice'
import authSlice from '../features/auth/authSlice'
import userSlice from '../features/user/userSlice'

export const rootReducer = {
  matchOffline: offlineMatchSlice,
  auth: authSlice,
  user: userSlice,
}
