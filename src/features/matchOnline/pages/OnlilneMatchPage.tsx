import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Board from '@/components/Board'
import Loader from '@/components/Loader'
import TokensOnline from '../components/TokensOnline'
import BoardOverlayOnline from '../components/BoardOverlayOnline'
import DiceOnline from '../components/DiceOnline'
import { joinMatch } from '../onlineMatchSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'

function OnlineMatchPage() {
  const { roomId } = useParams()
  const dispatch = useAppDispatch()
  const isSocketConnected = useAppSelector((state) => state.socket.connected)
  const isLoading = useAppSelector((state) => state.matchOnline.room?.isLoading)

  useEffect(() => {
    if (roomId && isSocketConnected) {
      requestAnimationFrame(() => {
        dispatch(joinMatch({ roomId }))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, isSocketConnected])

  return (
    <div>
      <div className="relative size-[min(calc(90vh-100px),90vw)] mx-auto">
        <Board />
        <TokensOnline />
        <BoardOverlayOnline />
      </div>
      <div className="mt-6 flex justify-center">
        <DiceOnline />
      </div>
      <Loader isLoading={isLoading} />
    </div>
  )
}

export default OnlineMatchPage
