import { useState } from 'react'
import { Link } from 'react-router-dom'
import JoinMatchModal from '@/features/matchOnline/components/JoinMatchModal'
import SignOutIcon from '@/assets/icons/sign-out.svg?react'
import { useAppDispatch, useSignedIn } from '@/hooks'
import { signOut } from '@/features/auth/authSlice'

function Dashboard() {
  const dispatch = useAppDispatch()
  const [isJoinMatch, setIsJoinMatch] = useState(false)
  const isSignedIn = useSignedIn()
  const handleSignOutClick = () => {
    dispatch(signOut())
  }

  return (
    <div className="text-white">
      <div className="flex justify-end">
        {isSignedIn ? (
          <button title="Logout" onClick={handleSignOutClick}>
            <SignOutIcon className="size-10 fill-red-600" />
          </button>
        ) : (
          <div>
            <Link to="/auth/sign-in">Sign In</Link>{' '}
            <span className="mx-2">or</span>
            <Link to="/auth/sign-up">Sign Up</Link>
          </div>
        )}
      </div>
      <h1 className="text-white text-center py-8"> </h1>
      <div className="flex justify-center mt-10">
        <div
          onClick={() => setIsJoinMatch(true)}
          className="btn-filled bg-secondary inline-block m-4 p-10 text-xl uppercase text-center"
        >
          OnClick
        </div>
        <Link
          to="/match/offline"
          className="btn-filled bg-white text-black inline-block m-4 p-10 text-xl uppercase text-center"
        >
          OffClick
        </Link>
      </div>

      <JoinMatchModal
        isOpen={isJoinMatch}
        onClose={() => setIsJoinMatch(false)}
      />
    </div>
  )
}

export default Dashboard
