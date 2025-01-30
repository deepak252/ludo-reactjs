import { useEffect, useRef } from 'react'
import FormInputWrapper from '@/components/FormInputWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks'
import { useFormik } from 'formik'
import { joinMatch, resetMatch } from '../onlineMatchSlice'

type JoinMatchModalProps = {
  onClose: () => void
  onCreateMatchClick?: () => void
}
const JoinMatchModal = ({
  onClose,
  onCreateMatchClick,
}: JoinMatchModalProps) => {
  const dispatch = useAppDispatch()
  const roomIdRef = useRef('')
  const room = useAppSelector((state) => state.matchOnline.room)
  const roomId = room.match?.roomId
  const navigate = useNavigateWithState()

  useEffect(() => {
    if (roomId && roomIdRef.current !== roomId) {
      roomIdRef.current = roomId
      navigate(`/match/online/${roomId}`)
    }
    return () => {
      dispatch(resetMatch())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  const formik = useFormik({
    initialValues: {
      roomId: '',
    },
    onSubmit: (values) => {
      dispatch(joinMatch(values))
    },
  })

  return (
    <ModalWrapper
      onClose={onClose}
      isOpen
      showCloseIcon
      closeOnEsc={false}
      closeOnOutsideClick={false}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="modal-container">
          <p className="text-lg">Join Match</p>
          <FormInputWrapper className="mt-4">
            <input
              type="text"
              name="roomId"
              placeholder="Enter room id"
              value={formik.values.roomId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormInputWrapper>
          <button
            className="btn-filled-green mt-6"
            disabled={!formik.values.roomId.trim() || room.isLoading}
            type="submit"
          >
            Join
          </button>
          <p className="text-center my-3">OR</p>
          <button
            className="btn-filled-secondary"
            onClick={(e) => {
              e.preventDefault()
              onCreateMatchClick?.()
            }}
          >
            Create Match
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default JoinMatchModal
