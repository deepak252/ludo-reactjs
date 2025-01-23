import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import JoinMatchModal from '@/features/matchOnline/components/JoinMatchModal'
import { useAppDispatch, useSignedIn } from '@/hooks'
import CreateMatchModal from '@/features/matchOnline/components/CreateMatchModal'
import { getOngoingMatch } from '@/features/matchOnline/onlineMatchSlice'
import OnlineMatchItem from '@/features/matchOnline/components/OngoingMatchItem'

function Dashboard() {
  const dispatch = useAppDispatch()
  const [isJoinMatchModalOpen, setIsJoinMatchModalOpen] = useState(false)
  const [isCreateMatchModalOpen, setIsCreateMatchModalOpen] = useState(false)
  const isSignedIn = useSignedIn()

  useEffect(() => {
    if (isSignedIn) {
      dispatch(getOngoingMatch())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn])

  return (
    <div className="text-white p-6">
      {/* <div className="flex justify-end">
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
      </div> */}
      {/* <h1 className="text-white text-center"> Ludo Champ </h1> */}
      <OnlineMatchItem />
      <div className="flex justify-center">
        <button
          onClick={() => setIsJoinMatchModalOpen(true)}
          className="btn-filled bg-secondary inline-block m-4 p-10 text-xl uppercase text-center"
        >
          Onclick
        </button>
        <Link
          to="/match/offline"
          className="btn-filled bg-white text-black inline-block m-4 p-10 text-xl uppercase text-center"
        >
          Offclick
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
