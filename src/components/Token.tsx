import classNames from 'classnames'
import LocationIcon from '@/assets/icons/location.svg?react'

type TokenProps = {
  color: string
  highlight?: boolean
  top?: number
  left?: number
  className?: string
}

const Token = ({ color, top, left, highlight, className }: TokenProps) => {
  if (top == 0 && left == 0) return <></>
  return (
    <div>
      <LocationIcon
        className={classNames(
          'absolute size-[min(5vh,5vw)] stroke-black stroke-[6px]',
          className,
          {
            'stroke-cyan-500 stroke-[min(3vh,3vw)] !size-[min(6vh,6vw)]': highlight,
          }
        )}
        style={{ fill: color, top, left }}
      />
    </div>
    // <div
    //   className={classNames(
    //     'size-[min(6vh,6vw)] rounded-full border-[3px] border-gray-700 shadow-md',
    //     className
    //   )}
    //   style={{ backgroundColor: color, top, left }}
    // ></div>
  )
}

export default Token
