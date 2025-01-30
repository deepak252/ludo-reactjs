import { useCallback, useMemo } from 'react'
import Token from '@/components/Token'
import BoardConstants from '@/constants/boardConstants'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { PlayerColor, Position, TokenInfo } from '@/shared.types'
import { pickToken } from '../../onlineMatchSlice'
import { checkTokenPresent } from '../../onlineMatchUtil'

const TokensOnline = () => {
  const dispatch = useAppDispatch()
  const match = useAppSelector((state) => state.matchOnline.room.match)
  const { players, turn } = match ?? {}

  const getTokenPosition = useCallback(
    (color: PlayerColor, tokenIndex: number, pathIndex: number) => {
      if (pathIndex === -1 && tokenIndex >= 0 && tokenIndex < 4) {
        return BoardConstants.HOME[color][tokenIndex]
      } else if (pathIndex >= 0 && pathIndex <= 56) {
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
      if (turn === key || !player.userId) {
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
    if (!match) return
    const tokenIndex = checkTokenPresent(match, position)
    console.log({ match, position, tokenIndex })

    if (tokenIndex === -1) return

    dispatch(pickToken({ tokenIndex }))
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
