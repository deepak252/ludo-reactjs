import JoinMatchModal from '@/features/matchOnline/components/JoinMatchModal'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [isJoinMatch, setIsJoinMatch] = useState(true)

  return (
    <div>
      <h1 className="text-white text-center py-8">Ludo</h1>
      <div className="flex justify-center mt-10">
        <div
          onClick={() => setIsJoinMatch(true)}
          className="btn-filled bg-secondary inline-block m-4 p-10 text-xl uppercase text-center"
        >
          Play Online
        </div>
        <Link
          to="/match/offline"
          className="btn-filled bg-white text-black inline-block m-4 p-10 text-xl uppercase text-center"
        >
          Play Offline
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
