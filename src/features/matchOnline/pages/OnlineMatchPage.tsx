import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '@/components/Loader'
import BoardOnline from '../components/BoardOnline'
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
    <div className="relative h-screen">
      <div className="absolute-center w-full p-10 max-h-screen">
        <BoardOnline />
        {/* <PlayersOnline /> */}
      </div>
      {/* <DiceOnline /> */}
      <Loader isLoading={isLoading} />
    </div>
    // <div>
    //   <div className="relative size-[min(calc(90vh-100px),90vw)] mx-auto">
    //     <Board />
    //     <TokensOnline />
    //     <BoardOverlayOnline />
    //   </div>
    //   <div className="mt-6 flex justify-center">
    //     <DiceOnline />
    //   </div>
    //   <Loader isLoading={isLoading} />
    // </div>
  )
}

export default OnlineMatchPage
