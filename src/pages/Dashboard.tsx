import { useState } from 'react'
import { Link } from 'react-router-dom'
import JoinMatchModal from '@/features/matchOnline/components/JoinMatchModal'
import SignOutIcon from '@/assets/icons/sign-out.svg?react'
import { useAppDispatch, useSignedIn } from '@/hooks'
import { signOut } from '@/features/auth/authSlice'
import CreateMatchModal from '@/features/matchOnline/components/CreateMatchModal'

function Dashboard() {
  const dispatch = useAppDispatch()
  const [isJoinMatchModalOpen, setIsJoinMatchModalOpen] = useState(false)
  const [isCreateMatchModalOpen, setIsCreateMatchModalOpen] = useState(false)
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
      <h1 className="text-white text-center"> Ludo Champ </h1>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setIsJoinMatchModalOpen(true)}
          className="btn-filled bg-secondary inline-block m-4 p-10 text-xl uppercase text-center"
        >
          Play Online
        </button>
        <Link
          to="/match/offline"
          className="btn-filled bg-white text-black inline-block m-4 p-10 text-xl uppercase text-center"
        >
          Play Offline
        </Link>
      </div>

      {isJoinMatchModalOpen && (
        <JoinMatchModal
          isOpen={isJoinMatchModalOpen}
          onClose={() => setIsJoinMatchModalOpen(false)}
          onCreateMatchClick={() => {
            setIsJoinMatchModalOpen(false)
            setTimeout(() => {
              setIsCreateMatchModalOpen(true)
            }, 200)
          }}
        />
      )}
      {isCreateMatchModalOpen && (
        <CreateMatchModal
          isOpen={isCreateMatchModalOpen}
          onClose={() => setIsCreateMatchModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Dashboard
