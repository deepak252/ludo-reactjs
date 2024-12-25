import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Board from '@/components/Board'
import TokensOffline from '@/features/matchOffline/components/TokensOffline'
import DiceOffline from '../components/DiceOffline'
import { useAppDispatch } from '@/hooks'
import { startMatch } from '../offlineMatchSlice'

function OfflineMatchPage() {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const playerCount = searchParams.get('count') || 4

  useEffect(() => {
    if (!isNaN(Number(playerCount))) {
      dispatch(startMatch({ playerCount: Number(playerCount) }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCount])

  return (
    <div>
      <div className="relative size-[min(calc(90vh-100px),90vw)] mx-auto">
        <Board />
        <TokensOffline />
      </div>
      <div className="mt-6 flex justify-center">
        <DiceOffline />
      </div>
    </div>
  )
}

export default OfflineMatchPage
