import { useAppDispatch, useAppSelector } from '@/hooks'
import { pickToken } from '@/features/match/matchSlice'
import { Position, TokenInfo } from '@/shared.types'
import { useMemo } from 'react'
import Token from './Token'

const Tokens = () => {
  const dispatch = useAppDispatch()
  const players = useAppSelector((state) => state.match.players)
  const mappedTokens = useMemo(() => {
    const tokenMapping: Record<string, TokenInfo[]> = {}
    Object.values(players).forEach((player) => {
      player.tokens.forEach((token) => {
        const [a, b] = token.position
        const key = `${a},${b}`
        if (!tokenMapping[key]) {
          tokenMapping[key] = []
        }
        tokenMapping[key].push(token)
      })
    })
    return tokenMapping
  }, [players])
  const handleCellClick = (position: Position) => {
    // dispatch(cellClicked({ position }))
    dispatch(pickToken({ position }))
  }
  return (
    <div>
      {Object.values(mappedTokens).map((tokens) => {
        return tokens.map((token, index) => (
          <Token
            key={token.id}
            delta={index * 0.7}
            color={token.color}
            position={token.position}
            onClick={handleCellClick}
          />
        ))
      })}
      {/* {Object.values(players).map((value) => {
        return value.tokens.map((token) => (
          <Token
            key={token.id}
            color={token.color}
            position={token.position}
            onClick={handleCellClick}
          />
        ))
      })} */}
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
