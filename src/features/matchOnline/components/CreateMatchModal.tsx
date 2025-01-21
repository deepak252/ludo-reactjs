import classNames from 'classnames'
import { useFormik } from 'formik'
import FormInputWrapper from '@/components/FormInputWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import { CreateRoomFormValues } from '@/shared.types'
import { validateCreateOnlineMatchForm } from '../onlineMatchUtil'
import { useAppDispatch } from '@/hooks'
import { createMatch } from '../onlineMatchSlice'

type CreateMatchModalProps = {
  isOpen: boolean
  onClose: () => void
}
const CreateMatchModal = ({ isOpen, onClose }: CreateMatchModalProps) => {
  const dispatch = useAppDispatch()
  const formik = useFormik<CreateRoomFormValues>({
    initialValues: {},
    validate: validateCreateOnlineMatchForm,
    onSubmit: ({ maxPlayersCount }) => {
      dispatch(createMatch({ maxPlayersCount }))
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
            <p className="text-lg text-center mb-4">Create Match</p>
            <p className="text-sm">No. of Players* :</p>
            <div className="flex">
              {[2, 3, 4].map((count) => (
                <div
                  key={count}
                  className={classNames(
                    'base-chip disable-select cursor-pointer',
                    {
                      active: formik.values.maxPlayersCount === count,
                    }
                  )}
                  onClick={() => formik.setFieldValue('maxPlayersCount', count)}
                >
                  {count}
                </div>
              ))}
            </div>
            {formik.errors.maxPlayersCount && (
              <p className="form-input-error mt-0">
                {formik.errors.maxPlayersCount}
              </p>
            )}

            <p className="text-sm mt-4">Invite Users:</p>
            <FormInputWrapper className="mt-2">
              <input
                type="text"
                name="roomId"
                placeholder="Search user"
                // value={formik.values.roomId}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
            </FormInputWrapper>

            <button
              className="btn-filled-secondary mt-6"
              type="submit"
              // onClick={async () => {
              //   console.log('sdf')
              //   formik.submitForm()
              // }}
            >
              Create Match
            </button>
          </div>
        </form>
      </ModalWrapper>
    )
  )
}

export default CreateMatchModal
