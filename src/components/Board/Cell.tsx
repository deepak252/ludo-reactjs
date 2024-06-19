import classNames from 'classnames'
import StarIcon from '@/assets/icons/star.svg?react'
const Cell = ({
  row,
  col,
  isSafeCell,
  className,
}: {
  row: number
  col: number
  isSafeCell?: boolean
  className?: string
}) => {
  return (
    <div
      className={classNames(
        'relative size-full border border-black text-xs text-center',
        className
      )}
    >
      {isSafeCell && <StarIcon className="size-2/3 absolute-center" />}
      <div>
        {row}, {col}
      </div>
    </div>
  )
}

export default Cell
