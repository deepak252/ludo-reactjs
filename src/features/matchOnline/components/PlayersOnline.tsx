import { useAppSelector } from '@/hooks'
import DiceOnline from './DiceOnline'
import classNames from 'classnames'

const PlayersOnline = () => {
  const match = useAppSelector((state) => state.matchOnline.room.match)
  const { turn } = match ?? {}
  // const currPlayer = useAppSelector((state) => state.user.profile.data?._id)

  return (
    <div
      className={classNames('absolute', {
        '-top-32 left-0': turn === 'green',
        '-top-32 right-0': turn === 'yellow',
        '-bottom-32 right-0': turn === 'blue',
        '-bottom-32 left-0': turn === 'red',
      })}
    >
      <DiceOnline />
    </div>
  )
}

export default PlayersOnline
