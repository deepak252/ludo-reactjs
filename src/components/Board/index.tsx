import { memo } from 'react'
import classNames from 'classnames'
import Base from './Base'
import Cell from './Cell'
import Terminal from './Terminal'
import BoardConstants from '@/constants/boardConstants'
import { useAppDispatch } from '@/hooks'
import { cellClicked } from '@/slices/matchSlice'
import { Position } from '@/shared.types'

const arr = [...new Array(15)]
const Board = () => {
  const dispatch = useAppDispatch()
  const handleCellClick = (position: Position) => {
    dispatch(cellClicked({ position }))
  }
  return (
    <div className="relative grid grid-cols-[repeat(15,1fr)] bg-slate-200  size-[min(90vh,90vw)] rounded-3xl overflow-hidden">
      {arr.map((_, row) => {
        return arr.map((_, col) => (
          <Cell
            key={`${row},${col}`}
            row={row}
            col={col}
            isSafeCell={BoardConstants.SAFE_CELLS.includesDeep([row, col])}
            className={classNames({
              'bg-green-500': BoardConstants.GREEN_CELLS.includesDeep([
                row,
                col,
              ]),
              'bg-yellow-500': BoardConstants.YELLOW_CELLS.includesDeep([
                row,
                col,
              ]),
              'bg-blue-500': BoardConstants.BLUE_CELLS.includesDeep([row, col]),
              'bg-red-500': BoardConstants.RED_CELLS.includesDeep([row, col]),
            })}
            onClick={handleCellClick}
          />
        ))
      })}
      <Base color={BoardConstants.COLORS.green} className="top-0 left-0" />
      <Base color={BoardConstants.COLORS.yellow} className="top-0 right-0" />
      <Base color={BoardConstants.COLORS.blue} className="bottom-0 right-0" />
      <Base color={BoardConstants.COLORS.red} className="bottom-0 left-0" />
      <Terminal />
    </div>
  )
}

export default memo(Board)
