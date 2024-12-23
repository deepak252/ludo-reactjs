import { LudoColor, Position } from '@/shared.types'
import classNames from 'classnames'

type TokenProps = {
  color: LudoColor
  highlight?: boolean
  position: Position
  onClick?: (position: Position) => void
}

const Token = ({
  color,
  position = [0, 0],
  highlight,
  onClick,
}: TokenProps) => {
  const posTop = `${position[0] * 6.666}%`
  const posLeft = `${position[1] * 6.666}%`

  return (
    <div
      className={classNames('absolute size-[6.66%]', {
        'bg-indigo-300': highlight,
      })}
      style={{ top: posTop, left: posLeft }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(position)
      }}
    >
      <div
        className={classNames(
          `absolute-center size-2/3 bg-${color}-600 rounded-full shadow-token`
        )}
      >
        <div
          className={`absolute-center size-[88%] border-2 border-white bg-${color}-600 rounded-full`}
        ></div>
      </div>
    </div>
  )
}

export default Token
