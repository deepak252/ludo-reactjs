import classNames from 'classnames'
import StarIcon from '@/assets/icons/star.svg?react'
import {
  BLUE_CELLS,
  GREEN_CELLS,
  RED_CELLS,
  SAFE_CELLS,
  YELLOW_CELLS,
} from '@/constants'

const Cell = ({ index }: { index: number }) => {
  return (
    <div
      className={classNames('relative size-full border border-gray', {
        'bg-red-600': RED_CELLS.includes(index),
        'bg-green-600': GREEN_CELLS.includes(index),
        'bg-blue-600': BLUE_CELLS.includes(index),
        'bg-yellow-500': YELLOW_CELLS.includes(index),
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
export default Cell
