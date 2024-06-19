import classNames from 'classnames'
import StarIcon from '@/assets/icons/star.svg?react'
import { useEffect, useState } from 'react'
import useWindowDimensions from '@/hooks/useWindowDimensions'

const RED_CELLS = [92, 107, 108, 109, 110, 111]
const GREEN_CELLS = [24, 23, 38, 53, 68, 83, 92]
const BLUE_CELLS = [202, 203, 188, 173, 158, 143]
const YELLOW_CELLS = [134, 119, 118, 117, 116, 115]
// const SAFE_CELLS = [92, 37, 24, 103, 134, 189, 202, 123]
const SAFE_CELLS = [92, 37, 24, 103, 134, 189, 202, 123]

const RED_PATH = [
  92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101,
  102, 103, 104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189,
  204, 219, 218, 217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121,
  106, 107, 108, 109, 110, 111,
]

// rounded-[min(3vh,3vw)]
const Board = () => {
  const { height, width } = useWindowDimensions()
  const d = (Math.min(height, width) * 0.9) / 15

  const [counter, setCounter] = useState(0)
  const left = (RED_PATH[counter] - 1) % 15
  const top = Math.floor(RED_PATH[counter] / 15)
  console.log(RED_PATH[counter], { top, left })

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === RED_PATH.length - 1) {
          clearInterval(interval)
        }
        return prev + 1
      })
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])
  // console.log(counter)

  return (
    <div className="relative grid grid-cols-[repeat(15,1fr)] border-black  bg-slate-200  size-[min(90vh,90vw)]">
      {[...new Array(225)].map((_, index) => (
        <BoardCell key={index} index={index + 1} />
      ))}
      <Base tokenColor="red" tokenCount={4} className="top-0 left-0 bg-red" />
      <Base
        tokenColor="green"
        tokenCount={4}
        className="top-0 right-0 bg-green "
      />
      <Base
        tokenColor="blue"
        tokenCount={4}
        className="bottom-0 left-0 bg-blue"
      />
      <Base
        tokenColor="yellow"
        tokenCount={4}
        className="bottom-0 right-0 bg-yellow"
      />
      <TerminalHome />
      <Token
        color="red"
        className="absolute z-50"
        left={Math.floor(d * left)}
        top={Math.floor(d * top)}
      />
    </div>
  )
}

const BoardCell = ({ index }: { index: number }) => {
  return (
    <div
      className={classNames('relative size-full border border-gray', {
        'bg-red': RED_CELLS.includes(index),
        'bg-green': GREEN_CELLS.includes(index),
        'bg-blue': BLUE_CELLS.includes(index),
        'bg-yellow': YELLOW_CELLS.includes(index),
      })}
    >
      {SAFE_CELLS.includes(index) && (
        <div className="absolute-center">
          <StarIcon className="size-[min(4vh,4vw)] " />
        </div>
      )}
      {index}
    </div>
  )
}

const Base = ({
  className,
  tokenCount,
  tokenColor,
}: {
  tokenColor: string
  className?: string
  tokenCount: 0 | 1 | 2 | 3 | 4
}) => {
  return (
    <div
      className={classNames('absolute z-10 size-[min(36vh,36vw)]', className)}
    >
      <div className="grid gap-[min(2vh,2vw)] grid-cols-2 size-full p-[min(6vh,6vw)]">
        {[...new Array(4)].map((_, i) => (
          <div key={i} className="relative size-full rounded-full bg-gray-1200">
            {i < tokenCount && (
              <Token color={tokenColor} className="absolute-center z-50" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const TerminalHome = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'absolute-center z-10 size-[min(18vh,18vw)] bg-white',
        className
      )}
    >
      <div className="size-full bg-white"></div>
    </div>
  )
}

const Token = ({
  color,
  top,
  left,
  className,
}: {
  color: string
  top?: number
  left?: number
  className?: string
}) => {
  return (
    <div
      className={classNames(
        'size-[min(5vh,5vw)] rounded-full border-2 border-black shadow-lg',
        className
      )}
      style={{ backgroundColor: color, top, left }}
    ></div>
  )
}

export default Board
