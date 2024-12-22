import { useEffect, useState } from 'react'
import classNames from 'classnames'
import CloseIcon from '@/assets/icons/close.svg?react'

export type ToastData = {
  type?: 'success' | 'failure' | null
  message?: string | null
}

export const TOAST_INITIAL_DATA: ToastData = {
  type: null,
  message: null,
}

type ToastProps = {
  onClose?: () => void
  durationMS?: number
} & ToastData

const Toast = ({
  message,
  type = 'success',
  onClose,
  durationMS = 3000,
}: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseToast()
    }, durationMS)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMS])

  const handleCloseToast = () => {
    setIsOpen(false)
    onClose && onClose()
  }

  const containerClassNames = classNames(
    'flex items-center fixed top-12 left-1/2 -translate-x-1/2 px-4 py-3 rounded-[30px] min-w-80 max-w-5xl min-h-14',
    {
      'bg-red-600 ': type === 'failure',
      'bg-green': type === 'success',
    }
  )

  return (
    <>
      {isOpen && (
        <div className={containerClassNames}>
          <p className="flex-grow text-white text-17 me-8 px-2 max-md:text-15">
            {message}
          </p>
          <div>
            <CloseIcon role="button" onClick={handleCloseToast} />
          </div>
        </div>
      )}
    </>
  )
}

export default Toast
