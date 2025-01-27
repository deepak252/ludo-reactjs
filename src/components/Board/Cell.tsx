import classNames from 'classnames'
import StarIcon from '@/assets/icons/star.svg?react'
import { Position } from '@/shared.types'
const Cell = ({
  row,
  col,
  isSafeCell,
  onClick,
  className,
}: {
  row: number
  col: number
  onClick?: (position: Position) => void
  isSafeCell?: boolean
  className?: string
}) => {
  return (
    <div
      className={classNames('board-cell', className)}
      onClick={() => onClick?.([row, col])}
    >
      {isSafeCell && <StarIcon className="size-2/3 absolute-center" />}
      {/* <div>
        {row}, {col}
      </div> */}
    </div>
  )
}

export default Cell
