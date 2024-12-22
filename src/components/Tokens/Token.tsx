import { LudoColor } from '@/shared.types'
import classNames from 'classnames'

type TokenProps = {
  color: LudoColor
  highlight?: boolean
  top?: number
  left?: number
}

const Token = ({ color, top = 0, left = 0, highlight }: TokenProps) => {
  const posTop = `${top * 6.666}%`
  const posLeft = `${left * 6.666}%`

  return (
    <div
      className={classNames('absolute size-[6.66%]', {
        'bg-indigo-300': highlight,
      })}
      style={{ top: posTop, left: posLeft }}
    >
      <div
        className={classNames(
          `absolute-center size-2/3 bg-${color}-600 rounded-full shadow-coin`
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
