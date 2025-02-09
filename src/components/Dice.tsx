import { useEffect } from 'react'
import classNames from 'classnames'
import Dice1 from '@/assets/images/dice/dice-1.png'
import Dice2 from '@/assets/images/dice/dice-2.png'
import Dice3 from '@/assets/images/dice/dice-3.png'
import Dice4 from '@/assets/images/dice/dice-4.png'
import Dice5 from '@/assets/images/dice/dice-5.png'
import Dice6 from '@/assets/images/dice/dice-6.png'
import DiceThrowGif from '@/assets/dice-throw.gif'
import DiceThrowAudio from '@/assets/audio/dice-throw.mp3'
import useAudio from '@/hooks/useAudio'
import { PlayerColor } from '@/shared.types'
import { BoardState } from '@/constants/enums'

type DiceProps = {
  value: number
  playerTurn?: PlayerColor
  boardState?: BoardState
  onClick?: () => void
}
const Dice = ({ value, boardState, onClick }: DiceProps) => {
  const { replay } = useAudio(DiceThrowAudio)

  useEffect(() => {
    if (boardState === BoardState.DiceRolling) {
      replay()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardState])

  const getFace = () => {
    switch (value) {
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
  console.log({ boardState })

  return (
    <div className="cursor-pointer disable-select">
      {boardState === BoardState.DiceRolling ? (
        <img
          // src="/assets/dice-throw.gif"
          src={DiceThrowGif}
          alt="Dice Throw"
          className="relative z-10 size-16 max-sm:size-14"
        />
      ) : (
        <img
          src={getFace()}
          alt="Dice Throw"
          className={classNames(
            'relative z-10 size-14 rounded-xl max-sm:size-12',
            {
              // [`animate-glow-${playerTurn}`]: boardState === BoardState.RollDice,
              'animate-dice': boardState === BoardState.RollDice,
            }
          )}
          onClick={onClick}
        />
      )}
    </div>
  )
}

export default Dice

// import classNames from 'classnames'
// import Dice1 from '@/assets/images/dice/dice-1.png'
// import Dice2 from '@/assets/images/dice/dice-2.png'
// import Dice3 from '@/assets/images/dice/dice-3.png'
// import Dice4 from '@/assets/images/dice/dice-4.png'
// import Dice5 from '@/assets/images/dice/dice-5.png'
// import Dice6 from '@/assets/images/dice/dice-6.png'
// import { BoardState } from '@/constants'
// import { useAppDispatch, useAppSelector } from '@/hooks'
// import { throwDice } from '@/features/matchOffline/matchSlice'

// const Dice = () => {
//   const dispatch = useAppDispatch()
//   const dice = useAppSelector((state) => state.match.dice)
//   const playerTurn = useAppSelector((state) => state.match.turn)
//   const status = useAppSelector((state) => state.match.status)

//   const handleDiceClick = () => {
//     if (status === BoardState.throwDice) {
//       dispatch(throwDice())
//     }
//   }

//   const getFace = () => {
//     switch (dice.value) {
//       case 2:
//         return Dice2
//       case 3:
//         return Dice3
//       case 4:
//         return Dice4
//       case 5:
//         return Dice5
//       case 6:
//         return Dice6
//       default:
//         return Dice1
//     }
//   }

//   return (
//     <div className="flex items-center m-4">
//       <div className="cursor-pointer disable-select">
//         {status === BoardState.throwing ? (
//           <img
//             src="/assets/dice-throw.gif"
//             alt="Dice Throw"
//             className="relative z-10 size-28"
//           />
//         ) : (
//           <img
//             src={getFace()}
//             alt="Dice Throw"
//             className={classNames('relative z-10 size-20 rounded-xl m-4', {
//               [`animate-glow-${playerTurn}`]: status === BoardState.throwDice,
//             })}
//             onClick={handleDiceClick}
//           />
//         )}
//       </div>
//       {/* <div className="ms-2 uppercase text-xl">{playerTurn}</div> */}
//     </div>
//   )
// }

// // const DiceFace = ({value}: {value: number}) => {
// //   return Im
// // }

// export default Dice
