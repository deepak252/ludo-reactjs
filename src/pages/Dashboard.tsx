import { useEffect, useMemo, useState } from 'react'
import Board from '@/components/Board'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import Token from '@/components/Token'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { rollDice, startMatch } from '@/slices/matchSlice'
import { PATH } from '@/constants'

function Dashboard() {
  const matchState = useAppSelector((state) => state.match)
  const dispatch = useAppDispatch()
  const { height, width } = useWindowDimensions()
  const maxSize = Math.min(height, width)
  const d = (maxSize * 0.9) / 15

  // const tokensMapping: Record<number, { token: number; player: string }[]> =
  //   useMemo(() => {
  //     console.log(matchState.activePlayers, matchState.players)

  //     const mapping: Record<number, { token: number; player: string }[]> = {}

  //     matchState.activePlayers.forEach((player) => {
  //       matchState.players[player].tokens.forEach((token) => {
  //         if (token >= 0) {
  //           ;(mapping[PATH[player][token]] ??= []).push({
  //             player,
  //             token,
  //           })
  //           // if (mapping[PATH[player][token]]) {
  //           //   mapping[PATH[player][token]].push({
  //           //     player,
  //           //     token,
  //           //   })
  //           // } else {
  //           //   mapping[PATH[player][token]] = [
  //           //     {
  //           //       player,
  //           //       token,
  //           //     },
  //           //   ]
  //           // }
  //         }
  //       })
  //     })
  //     return mapping
  //   }, [matchState.activePlayers, matchState.players])

  // console.log(tokensMapping)
  // console.log(matchState)

  // const [counter, setCounter] = useState(0)
  // const left = PATH.red[counter] % 15
  // const top = Math.floor(PATH.red[counter] / 15)

  console.log(matchState)

  useEffect(() => {
    dispatch(
      startMatch({
        players: ['red', 'yellow'],
      })
    )
    // const interval = setInterval(() => {
    //   setCounter((prev) => {
    //     if (prev === RED_PATH.length - 2) {
    //       clearInterval(interval)
    //     }
    //     return prev + 1
    //   })
    // }, 100)
    // return () => {
    //   clearInterval(interval)
    // }
  }, [])
  // console.log(matchState.players.red.tokens[0])

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
        {/* {Object.keys(tokensMapping)
          .map(Number)
          .map((pos) => {
            Object
            return (
              <Token
                color={tokensMapping[pos].player}
                // className="absolute"
                top={Math.floor(PATH[p][t] / 15) * d}
                left={(PATH[p][t] % 15) * d}
              />
            )
          })} */}
        {matchState.activePlayers.map((player) =>
          matchState.players[player].tokens.map((token) => {
            // console.log(p, t, PATH[p][t])

            if (token.pos < 0) return <div key={token.id}></div>
            return (
              <Token
                key={token.id}
                color={token.color}
                // className="absolute"
                top={Math.floor(PATH[player][token.pos] / 15) * d}
                left={(PATH[player][token.pos] % 15) * d}
                highlight={token.canMove}
              />
            )
          })
        )}
        {/* <Token color="red" className="absolute" top={top * d} left={left * d} /> */}
      </div>
    </div>
  )
}

export default Dashboard
