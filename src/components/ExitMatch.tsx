import { useState } from 'react'
import ModalWrapper from '@/components/ModalWrapper'

const ExitMatch = ({ onExitClick }: { onExitClick?: () => void }) => {
  const [isConfirmExit, setIsConfirmExit] = useState(false)

  return (
    <>
      <button
        className="text-red-500 mt-4"
        onClick={() => {
          setIsConfirmExit(true)
        }}
      >
        Exit Match
      </button>

      {isConfirmExit && (
        <ModalWrapper
          onClose={() => {
            setIsConfirmExit(false)
          }}
          isOpen
          showCloseIcon
          closeOnEsc={true}
          closeOnOutsideClick={true}
        >
          <div className="modal-container">
            <p className="text-lg text-center mb-4">Exit Match</p>

            <div className="flex gap-4 justify-stretch">
              <button
                className="btn-filled-gray mt-6 w-full"
                onClick={() => {
                  setIsConfirmExit(false)
                }}
              >
                Cancel
              </button>
              <button
                className="btn-filled-red mt-6 w-full"
                onClick={onExitClick}
              >
                Exit
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  )
}

export default ExitMatch
