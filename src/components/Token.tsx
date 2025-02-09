import classNames from 'classnames'
import { PlayerColor, Position } from '@/shared.types'

type TokenProps = {
  color: PlayerColor
  position?: Position
  delta?: number
  highlight?: boolean
  // moving?: boolean
  onClick?: (position: Position) => void
}

const Token = ({
  delta = 0,
  color,
  position = [0, 0],
  highlight,
  // moving,
  onClick,
}: TokenProps) => {
  const posTop = `${position[0] * 6.666 - delta}%`
  const posLeft = `${position[1] * 6.666}%`

  return (
    <div
      className="absolute size-[6.66%] transition-all duration-[50]"
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
            // 'z-20': moving,
            // 'z-10': !moving,
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
