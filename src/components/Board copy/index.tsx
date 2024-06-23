import { memo } from 'react'
import TerminalHome from './TerminalHome'
import BaseHome from './BaseHome'
import Cell from './Cell'

type BoardProps = {
  tokenCountR: number
  tokenCountG: number
  tokenCountB: number
  tokenCountY: number
}

const Board = ({
  tokenCountR,
  tokenCountG,
  tokenCountB,
  tokenCountY,
}: BoardProps) => {
  console.log('Render')

  return (
    <div className="relative grid grid-cols-[repeat(15,1fr)] border-black  bg-slate-200  size-[min(90vh,90vw)]">
      {[...new Array(225)].map((_, index) => (
        <Cell key={index} index={index} />
      ))}
      <BaseHome
        tokenColor="red"
        tokenCount={tokenCountR}
        className="top-0 left-0 bg-red-600"
      />
      <BaseHome
        tokenColor="green"
        tokenCount={tokenCountG}
        className="top-0 right-0 bg-green-600 "
      />
      <BaseHome
        tokenColor="blue"
        tokenCount={tokenCountB}
        className="bottom-0 left-0 bg-blue-600"
      />
      <BaseHome
        tokenColor="yellow"
        tokenCount={tokenCountY}
        className="bottom-0 right-0 bg-yellow-500"
      />
      <TerminalHome />
    </div>
  )
}

export default memo(Board, (prevProps, currProps) => {
  return (
    prevProps.tokenCountR === currProps.tokenCountR &&
    prevProps.tokenCountG === currProps.tokenCountG &&
    prevProps.tokenCountB === currProps.tokenCountB &&
    prevProps.tokenCountY === currProps.tokenCountY
  )
})
