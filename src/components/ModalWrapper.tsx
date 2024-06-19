import { useEffect, useRef } from 'react'
import classNames from 'classnames'

type ModalWrapperProps = {
  isOpen: boolean
  onClose?: () => void
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  children: React.ReactNode
  className?: string
}

const ModalWrapper = ({
  isOpen,
  onClose,
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
        <div
          className={classNames(
            'fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-[#00000077] z-40',
            className
          )}
        >
          <div ref={modalRef}>{children}</div>
        </div>
      )}
    </>
  )
}

export default ModalWrapper
