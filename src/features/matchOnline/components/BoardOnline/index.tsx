import Board from '@/components/Board'
import TokensOnline from './TokensOnline'
import BoardOverlayOnline from './BoardOverlayOnline'
import DiceOnline from '../DiceOnline'

const BoardOnline = () => {
  return (
    <div className="relative mx-auto aspect-square w-[min(80vh-240px,100%)] min-w-80">
      <Board />
      <TokensOnline />
      <BoardOverlayOnline />
      <DiceOnline />
    </div>
  )
}

export default BoardOnline
