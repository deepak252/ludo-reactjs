import FormInputWrapper from '@/components/FormInputWrapper'
import ModalWrapper from '@/components/ModalWrapper'

type JoinMatchModalProps = {
  isOpen: boolean
  onClose: () => void
}
const JoinMatchModal = ({ isOpen, onClose }: JoinMatchModalProps) => {
  return (
    isOpen && (
      <ModalWrapper
        onClose={onClose}
        isOpen={true}
        closeOnEsc
        closeOnOutsideClick
      >
        <div className="modal-container">
          <FormInputWrapper>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              // value={formik.values.email}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
            />
          </FormInputWrapper>
          <FormInputWrapper className="mt-4">
            <input
              type="text"
              name="roomId"
              placeholder="Enter room id"
              // value={formik.values.email}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
            />
          </FormInputWrapper>
          <button className="base-button bg-[#03C91E] border-2 border-b-4 border-[#36f14f] rounded-2xl text-white mt-6">
            Join Match
          </button>
        </div>
      </ModalWrapper>
    )
  )
}

export default JoinMatchModal
