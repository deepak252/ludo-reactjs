import { useState } from 'react'
import { Link } from 'react-router-dom'
import JoinMatchModal from '@/features/matchOnline/components/JoinMatchModal'
import CreateMatchModal from '@/features/matchOnline/components/CreateMatchModal'
// import { getOngoingMatch } from '@/features/matchOnline/onlineMatchSlice'
import OnlineMatchItem from '@/features/matchOnline/components/OngoingMatchItem'

function Dashboard() {
  const [isJoinMatchModalOpen, setIsJoinMatchModalOpen] = useState(false)
  const [isCreateMatchModalOpen, setIsCreateMatchModalOpen] = useState(false)

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
      <div className="flex flex-col justify-center max-w-96 mx-auto">
        <button
          onClick={() => setIsJoinMatchModalOpen(true)}
          className="btn-filled-secondary p-5 text-xl mt-4"
        >
          Play Online
        </button>
        <Link to="/match/offline">
          <button className="btn-filled-blue p-5 text-xl w-full mt-4">
            Play Offline
          </button>
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
