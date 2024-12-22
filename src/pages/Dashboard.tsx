import Board from '@/components/Board'
import Tokens from '@/components/Tokens'

function Dashboard() {
  return (
    <div className="">
      <div className="game-board absolute-center">
        <Board />
        <Tokens />
      </div>
    </div>
  )
}

export default Dashboard
