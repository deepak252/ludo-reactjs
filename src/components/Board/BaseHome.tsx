import classNames from 'classnames'
import Token from '../Token'

const BaseHome = ({
  className,
  tokenCount,
  tokenColor,
}: {
  tokenColor: string
  className?: string
  tokenCount: number
}) => {
  return (
    <div
      className={classNames('absolute z-10 size-[min(36vh,36vw)]', className)}
    >
      <div className="grid gap-[min(2vh,2vw)] grid-cols-2 size-full p-[min(6vh,6vw)]">
        {[...new Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative size-full rounded-full bg-white bg-opacity-40"
          >
            {/* {i < tokenCount && (
              <Token color={tokenColor} className="absolute-center z-50" />
            )} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BaseHome
