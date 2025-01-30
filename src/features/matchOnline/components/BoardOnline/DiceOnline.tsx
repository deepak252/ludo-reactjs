import { useMemo } from 'react'
import Dice from '@/components/Dice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { BoardState } from '@/constants/enums'
import { rollDice } from '../../onlineMatchSlice'
import { PlayerColor } from '@/shared.types'
import classNames from 'classnames'

const DiceOnline = ({ currUserColor }: { currUserColor?: PlayerColor }) => {
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
  const playersCount =
    useAppSelector(
      (state) => state.matchOnline.room.match?.joinedPlayersCount
    ) || 0
  // const isGreenPlaying = useAppSelector(
  //   (state) => state.matchOnline.room.match?.players.green.isPlaying
  // )
  // const isYellowPlaying = useAppSelector(
  //   (state) => state.matchOnline.room.match?.players.yellow.isPlaying
  // )
  // const isBluePlaying = useAppSelector(
  //   (state) => state.matchOnline.room.match?.players.blue.isPlaying
  // )
  // const isRedPlaying = useAppSelector(
  //   (state) => state.matchOnline.room.match?.players.red.isPlaying
  // )

  const handleDiceClick = () => {
    if (boardState === BoardState.RollDice) {
      dispatch(rollDice())
    }
  }

  const topLeft = useMemo(() => {
    switch (currUserColor) {
      case 'green':
        return playerTurn === 'blue'
      case 'yellow':
        return playerTurn === 'red'
      case 'blue':
        return playerTurn === 'green'
      case 'red':
        return playerTurn === 'yellow'
    }
  }, [currUserColor, playerTurn])

  const topRight = useMemo(() => {
    switch (currUserColor) {
      case 'green':
        return playerTurn === 'red'
      case 'yellow':
        return playerTurn === 'green'
      case 'blue':
        return playerTurn === 'yellow'
      case 'red':
        return playerTurn === 'blue'
    }
  }, [currUserColor, playerTurn])

  const bottomRight = useMemo(() => {
    return currUserColor === playerTurn
  }, [currUserColor, playerTurn])

  const bottomLeft = useMemo(() => {
    switch (currUserColor) {
      case 'green':
        return playerTurn === 'yellow'
      case 'yellow':
        return playerTurn === 'blue'
      case 'blue':
        return playerTurn === 'red'
      case 'red':
        return playerTurn === 'green'
    }
  }, [currUserColor, playerTurn])

  return (
    <>
      <div className="w-full flex justify-between absolute -top-32">
        <div>
          <div
            className={classNames('dice-container ', {
              '!hidden': playersCount < 2,
            })}
          >
            {topLeft && (
              <Dice
                value={dice ?? 0}
                playerTurn={playerTurn}
                boardState={boardState}
                onClick={handleDiceClick}
              />
            )}
          </div>
        </div>
        <div
          className={classNames('dice-container', {
            '!hidden': playersCount < 3,
          })}
        >
          {topRight && (
            <Dice
              value={dice ?? 0}
              playerTurn={playerTurn}
              boardState={boardState}
              onClick={handleDiceClick}
            />
          )}
        </div>
      </div>
      <div className="w-full flex justify-between absolute -bottom-32">
        {playersCount < 4 && <div />}
        <div
          className={classNames('dice-container', {
            '!hidden': playersCount < 4,
          })}
        >
          {bottomLeft && (
            <Dice
              value={dice ?? 0}
              playerTurn={playerTurn}
              boardState={boardState}
              onClick={handleDiceClick}
            />
          )}
        </div>
        <div
          className={classNames('dice-container', {
            '!hidden': playersCount === 0,
          })}
        >
          {bottomRight && (
            <Dice
              value={dice ?? 0}
              playerTurn={playerTurn}
              boardState={boardState}
              onClick={handleDiceClick}
            />
          )}
        </div>
      </div>
    </>
  )

  // return (
  //   <div
  //     className={classNames('absolute', {
  //       '-top-32 left-0': playerTurn === 'green',
  //       '-top-32 right-0': playerTurn === 'yellow',
  //       '-bottom-32 right-0': playerTurn === 'blue',
  //       '-bottom-32 left-0': playerTurn === 'red',
  //     })}
  //   >
  //     <Dice
  //       value={dice ?? 0}
  //       playerTurn={playerTurn}
  //       boardState={boardState}
  //       onClick={handleDiceClick}
  //     />
  //   </div>
  // )
}

export default DiceOnline
