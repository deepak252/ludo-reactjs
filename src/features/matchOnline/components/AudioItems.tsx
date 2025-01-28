import { useEffect } from 'react'
import TokenMoveAudio from '@/assets/audio/token-move.mp3'
import useAudio from '@/hooks/useAudio'
import { useAppSelector } from '@/hooks'

const AudioItems = () => {
  const { replay } = useAudio(TokenMoveAudio)

  const tokenMoving = useAppSelector(
    (state) => state.matchOnline.tokenMovementSound
  )

  useEffect(() => {
    if (tokenMoving) {
      replay()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenMoving])
  return <div></div>
}

export default AudioItems
