import Board from '@/components/Board'
import TokensOnline from './TokensOnline'
import BoardOverlayOnline from './BoardOverlayOnline'
import PlayersOnline from '../PlayersOnline'

const BoardOnline = () => {
  return (
    <div className="relative mx-auto aspect-square w-[min(100vh-260px,100%)] min-w-80">
      <Board />
      <TokensOnline />
      <BoardOverlayOnline />
      <PlayersOnline />
    </div>
  )
}

export default BoardOnline
