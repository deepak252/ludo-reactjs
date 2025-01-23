import classNames from 'classnames'

export type ShimmerProps = {
  className?: string
}
const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div
      className={classNames(
        'overflow-hidden relative bg-primary-300/20 rounded-xl w-full',
        className
      )}
    >
      <div className="h-full animate-shimmer"></div>
    </div>
  )
}

export default Shimmer
