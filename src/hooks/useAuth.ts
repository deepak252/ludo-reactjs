import { userSignedIn } from '@/utils/storage'
import { useAppSelector } from '.'

export default function useAuth() {
  const isLocalSignedIn = userSignedIn()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  //   return (isSignedIn || isLocalSignedIn) && !isSignedOut
  return isAuthenticated !== false && isLocalSignedIn
}
