import { LudoStatus } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { throwDice } from '@/slices/matchSlice'
import classNames from 'classnames'

const Dice = () => {
  const dispatch = useAppDispatch()
  const dice = useAppSelector((state) => state.match.dice)
  const playerTurn = useAppSelector((state) => state.match.turn)
  const status = useAppSelector((state) => state.match.status)

  const handleDiceClick = () => {
    dispatch(throwDice())
  }

  return (
    <div className="flex items-center m-4">
      <div
        className={classNames(
          'relative size-20 bg-red-600 rounded-2xl cursor-pointer disable-select',
          {
            'bg-gray': status !== LudoStatus.throwDice,
          }
        )}
        onClick={handleDiceClick}
      >
        <p className="absolute-center text-white text-6xl">{dice.value}</p>
      </div>
      <div className="ms-2 uppercase text-xl">{playerTurn}</div>
    </div>
  )
}

export default Dice
