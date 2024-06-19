import classNames from 'classnames'

const Board = () => {
  return (
    <div className="relative  bg-slate-200  h-[min(90vh,90vw)] w-[min(90vh,90vw)] rounded-[min(4vh,4vw)]">
      <Base color="red" tokenCount={4} className="top-0 left-0" />
      <Base color="green" tokenCount={4} className="top-0 right-0" />
      <Base color="blue" tokenCount={4} className="bottom-0 left-0" />
      <Base color="yellow" tokenCount={4} className="bottom-0 right-0" />
      <TerminalHome />
    </div>
  )
}

const Base = ({
  className,
  tokenCount,
  color,
}: {
  color: string
  className?: string
  tokenCount: 0 | 1 | 2 | 3 | 4
}) => {
  return (
    <div
      className={classNames(
        'absolute z-10 h-[min(36vh,36vw)] w-[min(36vh,36vw)] rounded-[min(4vh,4vw)]',
        className
      )}
      style={{ background: color }}
    >
      <div className="grid gap-[min(4vh,4vw)] grid-cols-2 size-full p-[min(4vh,4vw)]">
        {[...new Array(4)].map((t) => (
          <div
            key={t}
            className="size-full rounded-full opacity-30 bg-black"
          ></div>
        ))}
      </div>
    </div>
  )
}

const TerminalHome = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'absolute-center z-10 h-[min(18vh,18vw)] w-[min(18vh,18vw)] bg-white',
        className
      )}
    >
      <div className="size-full bg-white"></div>
    </div>
  )
}

export default Board
