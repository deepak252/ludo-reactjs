import classNames from 'classnames'

const TerminalHome = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'absolute-center z-10 size-[min(18vh,18vw)] bg-white',
        className
      )}
    >
      <div className="size-full bg-white"></div>
    </div>
  )
}

export default TerminalHome
