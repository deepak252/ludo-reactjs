import classNames from 'classnames'
import Dice from '@/components/Dice'
import UserImg from '@/assets/images/user.png'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { BoardState } from '@/constants/enums'
import { rollDice } from '../../offlineMatchSlice'

const DiceOffline = () => {
  const dispatch = useAppDispatch()
  const dice = useAppSelector((state) => state.matchOffline.match.diceValue)
  const playerTurn = useAppSelector((state) => state.matchOffline.match.turn)
  const boardState = useAppSelector(
    (state) => state.matchOffline.match.boardState
  )
  const playersCount = useAppSelector(
    (state) => state.matchOffline.match.playersCount
  )

  const userIdG = useAppSelector(
    (state) => state.matchOffline.match.players.green.userId
  )
  const userIdY = useAppSelector(
    (state) => state.matchOffline.match.players.yellow.userId
  )
  const userIdB = useAppSelector(
    (state) => state.matchOffline.match.players.blue.userId
  )
  const userIdR = useAppSelector(
    (state) => state.matchOffline.match.players.red.userId
  )

  const handleDiceClick = () => {
    if (boardState === BoardState.RollDice) {
      dispatch(rollDice())
    }
  }

  const topLeft = playerTurn === 'green'
  const topRight = playerTurn === 'yellow'
  const bottomRight = playerTurn === 'blue'
  const bottomLeft = playerTurn === 'red'

  return (
    <>
      <div className="w-full flex gap-4 justify-between absolute -top-32 max-sm:-top-28">
        <div className="flex gap-3">
          <PlayerInfo name={userIdG} />
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
        <div className="flex gap-3">
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
          <PlayerInfo name={userIdY} />
        </div>
      </div>
      <div className="w-full flex gap-4 justify-between absolute -bottom-32 max-sm:-bottom-28">
        <div className="flex gap-3">
          <PlayerInfo name={userIdR} />
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
        </div>
        <div className="flex gap-3">
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
          <PlayerInfo name={userIdB} />
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

const PlayerInfo = ({ name }: { name?: string | null }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={UserImg}
        alt="user"
        className="size-16 bgre p-2 bg-white rounded-full"
      />
      <p className="my-2 line-clamp-1 text-sm w-20 text-center">{name}</p>
    </div>
  )
}

export default DiceOffline
