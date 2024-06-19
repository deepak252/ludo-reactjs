import classNames from 'classnames'
import { LudoColor } from '@/shared.types'

const Base = ({
  color,
  className,
}: {
  color: LudoColor
  className?: string
}) => {
  return (
    <div className={classNames(`absolute size-2/5 bg-${color}-500`, className)}>
      <div className={`absolute-center rounded-2xl size-2/3 bg-${color}-200`} />
    </div>
  )
}

export default Base
