import { useEffect } from 'react'
import Board from '@/components/Board'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import Token from '@/components/Token'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { move, rollDice, startMatch } from '@/slices/matchSlice'
import { PATH } from '@/constants'

function Dashboard() {
  const matchState = useAppSelector((state) => state.match)
  const dispatch = useAppDispatch()
  const { height, width } = useWindowDimensions()
  const maxSize = Math.min(height, width)
  const d = (maxSize * 0.9) / 15

  useEffect(() => {
    dispatch(
      startMatch({
        players: ['red', 'yellow'],
      })
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="">
      <div className="flex flex-col p-4">
        <button
          onClick={() => dispatch(rollDice())}
          className="text-6xl rounded-xl bg-black text-white size-20 disabled:opacity-50"
          disabled={!matchState.canRollDice}
        >
          {matchState.dice}
        </button>
        <p className=" mt-4 text-2xl uppercase">
          Move: {matchState.activePlayers[matchState.turn]}
        </p>
      </div>
      <div className="game-board absolute-center">
        <Board
          tokenCountR={
            matchState.players.red.tokens.filter((token) => token.pos === -1)
              .length
          }
          tokenCountG={
            matchState.players.green.tokens.filter((token) => token.pos === -1)
              .length
          }
          tokenCountB={
            matchState.players.blue.tokens.filter((token) => token.pos === -1)
              .length
          }
          tokenCountY={
            matchState.players.yellow.tokens.filter((token) => token.pos === -1)
              .length
          }
        />
        {matchState.activePlayers.map((player) =>
          matchState.players[player].tokens.map((token, index) => {
            // console.log(p, t, PATH[p][t])

            if (token.pos < 0) return <div key={token.id}></div>
            return (
              <Token
                key={token.id}
                color={token.color}
                top={Math.floor(PATH[player][token.pos] / 15) * d}
                left={(PATH[player][token.pos] % 15) * d}
                highlight={token.canMove}
                onClick={() => {
                  dispatch(
                    move({
                      tokenIndex: index,
                    })
                  )
                }}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default Dashboard
