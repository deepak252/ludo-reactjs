import Board from '@/components/Board'
import TokensOffline from './TokensOffline'
import DiceOffline from './DiceOffline'
import AudioItems from './AudioItems'

const BoardOffline = () => {
  return (
    <div className="relative mx-auto aspect-square w-[min(80vh-240px,100%)] min-w-80">
      <div className="size-full">
        <Board />
        <TokensOffline />
      </div>
      <DiceOffline />
      <AudioItems />
    </div>
  )
}

export default BoardOffline
