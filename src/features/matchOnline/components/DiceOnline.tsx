import classNames from 'classnames'
import Dice from '@/components/Dice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { BoardState } from '@/constants/enums'
import { rollDice } from '../onlineMatchSlice'

const DiceOnline = () => {
  const dispatch = useAppDispatch()
  const dice = useAppSelector(
    (state) => state.matchOnline.room.match?.diceValue
  )
  const playerTurn = useAppSelector(
    (state) => state.matchOnline.room.match?.turn
  )
  const boardState = useAppSelector(
    (state) => state.matchOnline.room.match?.boardState
  )
  // console.log({ boardState, playerTurn })

  const handleDiceClick = () => {
    if (boardState === BoardState.RollDice) {
      dispatch(rollDice())
    }
  }

  return (
    <div
      className={classNames('absolute', {
        '-top-32 left-0': playerTurn === 'green',
        '-top-32 right-0': playerTurn === 'yellow',
        '-bottom-32 right-0': playerTurn === 'blue',
        '-bottom-32 left-0': playerTurn === 'red',
      })}
    >
      <Dice
        value={dice ?? 0}
        playerTurn={playerTurn}
        boardState={boardState}
        onClick={handleDiceClick}
      />
    </div>
  )
}

export default DiceOnline
