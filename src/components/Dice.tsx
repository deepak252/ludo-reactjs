import classNames from 'classnames'
import Dice1 from '@/assets/images/dice/dice-1.png'
import Dice2 from '@/assets/images/dice/dice-2.png'
import Dice3 from '@/assets/images/dice/dice-3.png'
import Dice4 from '@/assets/images/dice/dice-4.png'
import Dice5 from '@/assets/images/dice/dice-5.png'
import Dice6 from '@/assets/images/dice/dice-6.png'
import { LudoStatus } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { throwDice } from '@/features/match/matchSlice'

const Dice = () => {
  const dispatch = useAppDispatch()
  const dice = useAppSelector((state) => state.match.dice)
  const playerTurn = useAppSelector((state) => state.match.turn)
  const status = useAppSelector((state) => state.match.status)

  const handleDiceClick = () => {
    if (status === LudoStatus.throwDice) {
      dispatch(throwDice())
    }
  }

  const getFace = () => {
    switch (dice.value) {
      case 2:
        return Dice2
      case 3:
        return Dice3
      case 4:
        return Dice4
      case 5:
        return Dice5
      case 6:
        return Dice6
      default:
        return Dice1
    }
  }

  return (
    <div className="flex items-center m-4">
      {/* <div
        className={classNames(
          'relative size-20 rounded-2xl cursor-pointer disable-select',
          `bg-${playerTurn}-500`,
          {
            '!bg-gray': status !== LudoStatus.throwDice,
            [`animate-glow-${playerTurn}`]: status === LudoStatus.throwDice,
          }
        )}
        onClick={handleDiceClick}
      >
        <p className="absolute-center text-white text-6xl">{dice.value}</p>
      </div> */}
      <div className="cursor-pointer disable-select">
        {status === LudoStatus.throwing ? (
          <img
            src="/assets/dice-throw.gif"
            alt="Dice Throw"
            className="relative z-10 size-28"
          />
        ) : (
          <img
            src={getFace()}
            alt="Dice Throw"
            className={classNames('relative z-10 size-20 rounded-xl m-4', {
              [`animate-glow-${playerTurn}`]: status === LudoStatus.throwDice,
            })}
            onClick={handleDiceClick}
          />
        )}
      </div>
      {/* <div className="ms-2 uppercase text-xl">{playerTurn}</div> */}
    </div>
  )
}

// const DiceFace = ({value}: {value: number}) => {
//   return Im
// }

export default Dice
