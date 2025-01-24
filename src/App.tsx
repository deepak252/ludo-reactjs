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
import { connectSocket, disconnectSocket } from './services/socket/socketSlice'
// import SocketService from './services/socket/socketService'

function App() {
  const interceptorSetup = useRef(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSocketConnected = useAppSelector((state) => state.socket.connected)
  const isSignedIn = useSignedIn()

  useEffect(() => {
    console.log({ isSocketConnected })
  }, [isSocketConnected])

  useEffect(() => {
    // Initiate socket connection
    dispatch(connectSocket())

    // Cleanup on unmount
    return () => {
      // dispatch(disconnectSocket())
    }
  }, [dispatch])

  useEffect(() => {
    // SocketService.connect()
    if (!interceptorSetup.current) {
      setupInterceptor(navigate)
      interceptorSetup.current = true
    }
    if (isSignedIn) {
      dispatch(getProfile())
    }
    // return () => {
    //   SocketService.disconnect()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return (
    <div className="bg-primary-600 min-h-screen">
      <AppRoutes />
    </div>
  )
}

export default App
