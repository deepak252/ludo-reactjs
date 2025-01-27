import classNames from 'classnames'
import { PlayerColor } from '@/shared.types'

const Base = ({
  color,
  className,
}: {
  color: PlayerColor
  className?: string
}) => {
  return (
    <div className={classNames(`absolute size-2/5 bg-${color}-500`, className)}>
      <div className={`absolute-center rounded-2xl size-2/3 bg-${color}-200`} />
    </div>
  )
}

export default Base
