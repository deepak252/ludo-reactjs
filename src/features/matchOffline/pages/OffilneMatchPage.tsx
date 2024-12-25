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
      <div className="game-board absolute-center">
        <Board />
        <TokensOffline />
      </div>
      <DiceOffline />
    </div>
  )
}

export default OfflineMatchPage
