import Board from '@/components/Board'
import Dice from '@/components/Dice'
import Tokens from '@/components/Tokens'

function Dashboard() {
  return (
    <div className="">
      <div className="game-board absolute-center">
        <Board />
        <Tokens />
      </div>
      <Dice />
    </div>
  )
}

export default Dashboard
