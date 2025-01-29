import Board from '@/components/Board'
import TokensOnline from './TokensOnline'
// import BoardOverlayOnline from './BoardOverlayOnline'
import DiceOnline from './DiceOnline'
import { useAppSelector } from '@/hooks'
import classNames from 'classnames'

const BoardOnline = () => {
  const currUserColor = useAppSelector(
    (state) => state.matchOnline.room.currUserColor
  )

  return (
    <div className="relative mx-auto aspect-square w-[min(80vh-240px,100%)] min-w-80">
      <div
        className={classNames('size-full', {
          'rotate-90': currUserColor === 'red',
          'rotate-180': currUserColor === 'green',
          '-rotate-90': currUserColor === 'yellow',
        })}
      >
        <Board />
        <TokensOnline />
      </div>
      {/* <BoardOverlayOnline /> */}
      <DiceOnline currUserColor={currUserColor} />
    </div>
  )
}

export default BoardOnline
