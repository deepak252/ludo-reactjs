import { LudoColor, Position } from '@/shared.types'
import classNames from 'classnames'

type TokenProps = {
  delta?: number
  color: LudoColor
  highlight?: boolean
  position: Position
  onClick?: (position: Position) => void
}

const Token = ({
  delta = 0,
  color,
  position = [0, 0],
  highlight,
  onClick,
}: TokenProps) => {
  const posTop = `${position[0] * 6.666 - delta}%`
  const posLeft = `${position[1] * 6.666}%`

  return (
    <div
      className="absolute size-[6.66%]"
      style={{ top: posTop, left: posLeft }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(position)
      }}
    >
      <div
        className={classNames(
          `absolute-center size-2/3 bg-${color}-600 rounded-full shadow-token`,
          {
            [`animate-glow-${color}`]: highlight,
          }
        )}
      >
        <div
          className={`absolute-center size-[88%] border-2 border-white bg-${color}-600 rounded-full`}
        />
      </div>
    </div>
  )
}

export default Token
