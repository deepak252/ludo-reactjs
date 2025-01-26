import { useCallback, useMemo } from 'react'
import Token from '@/components/Token'
import BoardConstants from '@/constants/boardConstants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { PlayerColor, Position, TokenInfo } from '@/shared.types'

const TokensOnline = () => {
  const dispatch = useAppDispatch()
  const players = useAppSelector(
    (state) => state.matchOnline.room.match?.players
  )
  const turn = useAppSelector((state) => state.matchOnline.room.match?.turn)

  const getTokenPosition = useCallback(
    (color: PlayerColor, tokenIndex: number, pathIndex: number) => {
      if (pathIndex === -1 && tokenIndex >= 0 && tokenIndex < 4) {
        return BoardConstants.HOME[color][tokenIndex]
      } else if (pathIndex >= 0 && pathIndex < 56) {
        return BoardConstants.PATH[color][pathIndex]
      }
      return []
    },
    []
  )

  const mappedTokens = useMemo(() => {
    if (!players || !turn) {
      return {}
    }
    const tokenMapping: Record<string, TokenInfo[]> = {}
    Object.entries(players).forEach(([key, player]) => {
      if (turn === key) {
        return
      }
      player.tokens.forEach((token) => {
        const [a, b] = getTokenPosition(
          key as PlayerColor,
          token.index,
          token.pathIndex
        )
        const pathId = `${a},${b}`
        if (!tokenMapping[pathId]) {
          tokenMapping[pathId] = []
        }
        tokenMapping[pathId].push({
          ...token,
          position: [a, b],
        })
      })
    })
    players[turn].tokens.forEach((token) => {
      const [a, b] = getTokenPosition(turn, token.index, token.pathIndex)
      const pathId = `${a},${b}`
      if (!tokenMapping[pathId]) {
        tokenMapping[pathId] = []
      }
      tokenMapping[pathId].push({
        ...token,
        position: [a, b],
      })
    })
    return tokenMapping
  }, [players, turn, getTokenPosition])

  const handleCellClick = (position: Position) => {
    // dispatch(pickToken({ position }))
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
            // moving={status === BoardState.moving && turn === token.color}
          />
        ))
      })}
    </div>
  )
}

export default TokensOnline
