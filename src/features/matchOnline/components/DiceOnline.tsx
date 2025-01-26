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
    <Dice
      value={dice ?? 0}
      playerTurn={playerTurn}
      boardState={boardState}
      onClick={handleDiceClick}
    />
  )
}

export default DiceOnline
