import FormInputWrapper from '@/components/FormInputWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import { useFormik } from 'formik'

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
  const formik = useFormik({
    initialValues: {
      roomId: '',
    },
    onSubmit: (values) => {
      console.log(values)
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
          >
            Join
          </button>
          <p className="text-center my-3">OR</p>
          <button className="btn-filled-secondary" onClick={onCreateMatchClick}>
            Create Match
          </button>
        </div>
      </ModalWrapper>
    )
  )
}

export default JoinMatchModal
