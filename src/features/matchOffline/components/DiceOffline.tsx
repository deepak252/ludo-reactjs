import { BoardState } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { throwDice } from '@/features/matchOffline/offlineMatchSlice'
import Dice from '@/components/Dice'

const DiceOffline = () => {
  const dispatch = useAppDispatch()
  const dice = useAppSelector((state) => state.matchOffline.dice)
  const playerTurn = useAppSelector((state) => state.matchOffline.turn)
  const status = useAppSelector((state) => state.matchOffline.status)

  const handleDiceClick = () => {
    if (status === BoardState.throwDice) {
      dispatch(throwDice())
    }
  }

  return (
    <Dice
      value={dice.value}
      playerTurn={playerTurn}
      status={status}
      onClick={handleDiceClick}
    />
  )
}

export default DiceOffline
