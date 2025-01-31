import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import JoinMatchModal from '@/features/matchOnline/components/JoinMatchModal'
import CreateMatchModal from '@/features/matchOnline/components/CreateMatchModal'
// import { getOngoingMatch } from '@/features/matchOnline/onlineMatchSlice'
import OnlineMatchItem from '@/features/matchOnline/components/OngoingMatchItem'
import VolumeOnIcon from '@/assets/icons/volume-on.svg?react'
import VolumeOffIcon from '@/assets/icons/volume-off.svg?react'
import AppLogo from '@/assets/images/logo1.png'
import HomeAudio from '@/assets/audio/home.mp3'
import { useAppDispatch, useAppSelector, useAudio } from '@/hooks'
import { toggleMuted } from '@/features/user/userSlice'

function Dashboard() {
  const dispatch = useAppDispatch()
  const [isJoinMatchModalOpen, setIsJoinMatchModalOpen] = useState(false)
  const [isCreateMatchModalOpen, setIsCreateMatchModalOpen] = useState(false)
  const isMuted = useAppSelector((state) => state.user.muted)
  const { mute: muteAudio, play: playAudio } = useAudio(HomeAudio, {
    loop: true,
    volume: 0.2,
    muted: isMuted,
    autoPlay: true,
  })

  useEffect(() => {
    muteAudio(isMuted)
    if (!isMuted) {
      playAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMuted])

  return (
    <div className="text-white p-6">
      <h1 className="text-white text-center">
        <span className="text-green-500">L</span>
        <span className="text-red-500">u</span>
        <span className="text-yellow-500">d</span>
        <span className="text-blue-500">o</span>
        <span className="text-white"> Champ</span>
      </h1>
      <img src={AppLogo} className="mx-auto size-60" />

      <OnlineMatchItem />
      <div className="flex flex-col justify-center max-w-96 mx-auto">
        <button
          onClick={() => setIsJoinMatchModalOpen(true)}
          className="btn-filled-secondary p-5 text-xl my-8"
        >
          Play Online
        </button>
        <Link to="/match/offline">
          <button className="btn-filled-blue p-5 text-xl w-full">
            Play Offline
          </button>
        </Link>
      </div>

      {isJoinMatchModalOpen && (
        <JoinMatchModal
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
        <CreateMatchModal onClose={() => setIsCreateMatchModalOpen(false)} />
      )}

      <button
        className="fixed top-6 right-6"
        onClick={() => {
          dispatch(toggleMuted())
        }}
      >
        {isMuted ? (
          <VolumeOffIcon className="size-10" />
        ) : (
          <VolumeOnIcon className="size-10" />
        )}
      </button>
    </div>
  )
}

export default Dashboard
