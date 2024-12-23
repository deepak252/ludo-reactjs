import Token from './Token'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { pickToken } from '@/slices/matchSlice'
import { Position } from '@/shared.types'

const Tokens = () => {
  const dispatch = useAppDispatch()
  const players = useAppSelector((state) => state.match.players)
  const handleCellClick = (position: Position) => {
    // dispatch(cellClicked({ position }))
    dispatch(pickToken({ position }))
  }
  return (
    <div>
      {Object.entries(players).map(([, value]) => {
        return value.tokens.map((token) => (
          <Token
            key={token.id}
            color={token.color}
            position={token.position}
            onClick={handleCellClick}
          />
        ))
      })}
      {/* {BoardConstants.GREEN_HOME.map((pos) => (
        <Token
          key={`${pos[0]},${pos[1]}`}
          color="green"
          position={pos}
          onClick={handleCellClick}
        />
      ))}
      {BoardConstants.YELLOW_HOME.map((pos) => (
        <Token
          key={`${pos[0]},${pos[1]}`}
          color="yellow"
          position={pos}
          onClick={handleCellClick}
        />
      ))}
      {BoardConstants.BLUE_HOME.map((pos) => (
        <Token
          key={`${pos[0]},${pos[1]}`}
          color="blue"
          position={pos}
          onClick={handleCellClick}
        />
      ))}
      {BoardConstants.RED_HOME.map((pos) => (
        <Token
          key={`${pos[0]},${pos[1]}`}
          color="red"
          position={pos}
          onClick={handleCellClick}
        />
      ))} */}
    </div>
  )
}

export default Tokens
