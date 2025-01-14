import classNames from 'classnames'

type FormInputWrapperProps = {
  trailing?: React.ReactNode
  children?: React.ReactNode
  error?: string
  className?: string
}

const FormInputWrapper = ({
  trailing,
  children,
  error,
  className,
}: FormInputWrapperProps) => {
  return (
    <>
      <div className={classNames('form-input-wrapper', className)}>
        {children}
        <div>{trailing}</div>
      </div>
      {error && <p className="form-input-error mt-2">{error}</p>}
    </>
  )
}

export default FormInputWrapper
