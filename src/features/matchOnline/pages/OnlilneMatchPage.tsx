import Board from '@/components/Board'
import TokensOffline from '@/features/matchOffline/components/TokensOffline'
import DiceOffline from '../components/DiceOnline'
import BoardOverlayOffline from '../components/BoardOverlayOnline'

function OnlineMatchPage() {
  return (
    <div>
      <div className="relative size-[min(calc(90vh-100px),90vw)] mx-auto">
        <Board />
        <TokensOffline />
        <BoardOverlayOffline />
      </div>
      <div className="mt-6 flex justify-center">
        <DiceOffline />
      </div>
    </div>
  )
}

export default OnlineMatchPage
