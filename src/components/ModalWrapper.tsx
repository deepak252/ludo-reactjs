import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import CloseIcon from '@/assets/icons/close-v2.svg?react'

type ModalWrapperProps = {
  isOpen: boolean
  showCloseIcon?: boolean
  onClose?: () => void
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  children: React.ReactNode
  className?: string
}

const ModalWrapper = ({
  isOpen,
  onClose,
  showCloseIcon,
  closeOnOutsideClick = false,
  closeOnEsc = false,
  children,
  className,
}: ModalWrapperProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!closeOnOutsideClick) {
      return
    }
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose && onClose()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, closeOnOutsideClick, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!closeOnEsc) {
      return
    }
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose && onClose()
      }
    }
    document.addEventListener('keydown', escFunction, false)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeOnEsc])

  return (
    <>
      {isOpen && (
        <div className={classNames('modal-wrapper', className)}>
          <div ref={modalRef} className="relative">
            {showCloseIcon && (
              <button className="absolute -top-16 right-0" onClick={onClose}>
                <CloseIcon className="size-16" />
              </button>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default ModalWrapper
