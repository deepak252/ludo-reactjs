import classNames from 'classnames'

const BoardOverlay = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'absolute size-2/5 bg-white bg-opacity-30 overflow-hidden',
        className
      )}
    />
  )
}

export default BoardOverlay
