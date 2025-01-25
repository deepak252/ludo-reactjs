import authSlice from '../features/auth/authSlice'
import userSlice from '../features/user/userSlice'
import offlineMatchSlice from '../features/matchOffline/offlineMatchSlice'
import onlineMatchSlice from '../features/matchOnline/onlineMatchSlice'
import socketSlice from '../services/socket/socketSlice'
import tempSlice from '../features/temp/tempSlice'

export const rootReducer = {
  auth: authSlice,
  user: userSlice,
  matchOffline: offlineMatchSlice,
  matchOnline: onlineMatchSlice,
  socket: socketSlice,
  temp: tempSlice,
}
