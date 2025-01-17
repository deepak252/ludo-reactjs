import { useEffect, useRef } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAppDispatch, useNavigateWithState, useSignedIn } from './hooks'
import { setupInterceptor } from './services/api'
import { getProfile } from './features/user/userSlice'

function App() {
  const interceptorSetup = useRef(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()
  const isSignedIn = useSignedIn()

  useEffect(() => {
    if (!interceptorSetup.current) {
      setupInterceptor(navigate)
      interceptorSetup.current = true
    }
    if (isSignedIn) {
      dispatch(getProfile())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return (
    <div className="bg-primary-800 min-h-screen">
      <AppRoutes />
    </div>
  )
}

export default App
