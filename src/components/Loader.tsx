import classNames from 'classnames'
import ModalWrapper from './ModalWrapper'

type SpinnerProps = {
  className?: string
  center?: boolean
}
const Spinner = ({ className, center }: SpinnerProps) => {
  return (
    <div
      className={classNames({
        'absolute-center': center,
      })}
    >
      <div
        className={classNames(
          'size-12 border-[6px] inline-block animate-spin rounded-full border-solid border-secondary border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]',
          className
        )}
        role="status"
      ></div>
    </div>
  )
}

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    isLoading && (
      <ModalWrapper isOpen={isLoading} className="z-loader">
        <Spinner center />
      </ModalWrapper>
    )
  )
}

export { Spinner }
export default Loader
