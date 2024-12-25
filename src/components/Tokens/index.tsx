import { useMemo } from 'react'
import Token from './Token'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { pickToken } from '@/features/match/matchSlice'
import { Position, TokenInfo } from '@/shared.types'

const Tokens = () => {
  const dispatch = useAppDispatch()
  const players = useAppSelector((state) => state.match.players)
  const turn = useAppSelector((state) => state.match.turn)

  const mappedTokens = useMemo(() => {
    const tokenMapping: Record<string, TokenInfo[]> = {}
    Object.entries(players).forEach(([key, player]) => {
      if (turn === key) {
        return
      }
      player.tokens.forEach((token) => {
        const [a, b] = token.position
        const key = `${a},${b}`
        if (!tokenMapping[key]) {
          tokenMapping[key] = []
        }
        tokenMapping[key].push(token)
      })
    })
    players[turn].tokens.forEach((token) => {
      const [a, b] = token.position
      const key = `${a},${b}`
      if (!tokenMapping[key]) {
        tokenMapping[key] = []
      }
      tokenMapping[key].push(token)
    })
    return tokenMapping
  }, [players, turn])
  const handleCellClick = (position: Position) => {
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
            highlight={token.highlight}
            // moving={status === LudoStatus.moving && turn === token.color}
          />
        ))
      })}
    </div>
  )
}

export default Tokens
