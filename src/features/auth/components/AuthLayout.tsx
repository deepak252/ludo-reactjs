import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { resetAuthState } from '../authSlice'
import { useAppDispatch, useNavigateWithState, useSignedIn } from '@/hooks'

const AuthLayout = () => {
  const navigate = useNavigateWithState()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isLocalSignedIn = useSignedIn()

  const from = (location.state?.from?.pathname as string) || '/'

  useEffect(() => {
    if (isLocalSignedIn) {
      navigate(from, { replace: true })
      dispatch(resetAuthState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, isLocalSignedIn, isLocalSignedIn, dispatch])
  return (
    <div className="p-4">
      <Outlet />
    </div>
  )
}

export default AuthLayout
