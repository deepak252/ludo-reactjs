import { useEffect, useRef } from 'react'
import AppRoutes from './routes/AppRoutes'
import {
  useAppDispatch,
  useAppSelector,
  useNavigateWithState,
  useSignedIn,
} from './hooks'
import { setupInterceptor } from './services/api'
import { getProfile } from './features/user/userSlice'
import { connectSocket, sendPing } from './services/socket/socketSlice'

function App() {
  const loadedRef = useRef(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSocketConnected = useAppSelector((state) => state.socket.connected)
  const isSignedIn = useSignedIn()

  useEffect(() => {
    if (isSocketConnected) {
      console.log('ping')
      dispatch(sendPing())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSocketConnected])

  useEffect(() => {
    if (!loadedRef.current) {
      setupInterceptor(navigate)
      dispatch(connectSocket({}))
      loadedRef.current = true
    } else {
      dispatch(connectSocket({ reconnect: true }))
    }
    if (isSignedIn) {
      dispatch(getProfile())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return (
    <div className="bg-primary-600 min-h-screen">
      <AppRoutes />
    </div>
  )
}

export default App
