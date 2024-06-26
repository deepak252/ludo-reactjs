import classNames from 'classnames'
import LocationIcon from '@/assets/icons/location.svg?react'

type TokenProps = {
  color: string
  highlight?: boolean
  top?: number
  left?: number
  className?: string
  onClick?: () => void
}

const Token = ({
  color,
  top,
  left,
  onClick,
  highlight,
  className,
}: TokenProps) => {
  if (top == 0 && left == 0) return <></>
  return (
    <div>
      <LocationIcon
        onClick={onClick}
        className={classNames(
          'absolute size-[min(5vh,5vw)] stroke-black stroke-[6px]',
          className,
          {
            'stroke-cyan-500 z-50 cursor-pointer stroke-[min(3vh,3vw)] !size-[min(6vh,6vw)]':
              highlight,
          }
        )}
        style={{ fill: color, top, left }}
      />
    </div>
  )
}

export default Token
