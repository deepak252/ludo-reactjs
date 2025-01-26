import BoardOverlay from '@/components/BoardOverlay'
import { useAppSelector } from '@/hooks'

const BoardOverlayOnline = () => {
  const playerTurn = useAppSelector(
    (state) => state.matchOnline.room.match?.turn
  )

  return (
    <div>
      {playerTurn !== 'green' && (
        <BoardOverlay className="top-0 left-0 rounded-tl-3xl" />
      )}
      {playerTurn !== 'yellow' && (
        <BoardOverlay className="top-0 right-0 rounded-tr-3xl" />
      )}
      {playerTurn !== 'blue' && (
        <BoardOverlay className="bottom-0 right-0 rounded-br-3xl" />
      )}
      {playerTurn !== 'red' && (
        <BoardOverlay className="bottom-0 left-0 rounded-bl-3xl" />
      )}
    </div>
  )
}

export default BoardOverlayOnline
