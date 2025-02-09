import { useEffect } from 'react'
import TokenMoveAudio from '@/assets/audio/token-move.mp3'
import TokenKillAudio from '@/assets/audio/token-kill.mp3'
import { useAppSelector, useAudio } from '@/hooks'

const AudioItems = () => {
  const { replay: playTokenMove } = useAudio(TokenMoveAudio)
  const { replay: playTokenKill, stop: stopTokenKill } =
    useAudio(TokenKillAudio)

  const tokenMoved = useAppSelector(
    (state) => state.matchOffline.tokenMovementSound
  )
  const tokenKilled = useAppSelector(
    (state) => state.matchOffline.tokenKillSound
  )

  useEffect(() => {
    if (tokenMoved) {
      playTokenMove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenMoved])

  useEffect(() => {
    if (tokenKilled) {
      playTokenKill()
    } else {
      stopTokenKill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenKilled])

  return <div></div>
}

export default AudioItems
