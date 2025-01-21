import authSlice from '../features/auth/authSlice'
import userSlice from '../features/user/userSlice'
import offlineMatchSlice from '../features/matchOffline/offlineMatchSlice'
import onlineMatchSlice from '../features/matchOnline/onlineMatchSlice'

export const rootReducer = {
  auth: authSlice,
  user: userSlice,
  matchOffline: offlineMatchSlice,
  matchOnline: onlineMatchSlice,
}
