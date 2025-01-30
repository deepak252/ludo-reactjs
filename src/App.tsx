import { useEffect, useRef } from 'react'
import AppRoutes from './routes/AppRoutes'
import {
  useAppDispatch,
  useAppSelector,
  useNavigateWithState,
  useAuth,
} from './hooks'
import { setupInterceptor } from './services/api'
import { getProfile } from './features/user/userSlice'
import { connectSocket, sendPing } from './services/socket/socketSlice'
import {
  connectOnlineMatch,
  getOngoingMatch,
} from './features/matchOnline/onlineMatchSlice'

function App() {
  const loadedRef = useRef(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSocketConnected = useAppSelector((state) => state.socket.connected)
  const isSignedIn = useAuth()

  useEffect(() => {
    if (!loadedRef.current) {
      loadedRef.current = true
      setupInterceptor(navigate)
      dispatch(connectSocket({}))
    } else {
      dispatch(connectSocket({ reconnect: true }))
    }
    if (isSignedIn) {
      dispatch(getProfile())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  useEffect(() => {
    if (isSocketConnected) {
      dispatch(sendPing())
      dispatch(connectOnlineMatch())
      if (isSignedIn) {
        dispatch(getOngoingMatch())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSocketConnected, isSignedIn])

  return (
    <div className="bg-primary-600 min-h-screen opacity-100">
      <AppRoutes />
    </div>
  )
}

export default App
