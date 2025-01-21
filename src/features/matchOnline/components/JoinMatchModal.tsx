import FormInputWrapper from '@/components/FormInputWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch } from '@/hooks'
import { useFormik } from 'formik'
import { joinMatch } from '../onlineMatchSlice'

type JoinMatchModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreateMatchClick?: () => void
}
const JoinMatchModal = ({
  isOpen,
  onClose,
  onCreateMatchClick,
}: JoinMatchModalProps) => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      roomId: '',
    },
    onSubmit: (values) => {
      dispatch(joinMatch(values))
    },
  })
  return (
    isOpen && (
      <ModalWrapper
        onClose={onClose}
        isOpen={true}
        closeOnEsc
        closeOnOutsideClick
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
              disabled={!formik.values.roomId.trim()}
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
  )
}

export default JoinMatchModal
