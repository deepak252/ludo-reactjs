import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useFormik } from 'formik'
import FormInputWrapper from '@/components/FormInputWrapper'
import ModalWrapper from '@/components/ModalWrapper'
import { CreateRoomFormValues } from '@/shared.types'
import { validateCreateOnlineMatchForm } from '../onlineMatchUtil'
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks'
import { createMatch, resetMatch } from '../onlineMatchSlice'

type CreateOnlineMatchModalProps = {
  onClose: () => void
}
const CreateOnlineMatchModal = ({ onClose }: CreateOnlineMatchModalProps) => {
  const dispatch = useAppDispatch()
  const roomIdRef = useRef('')
  const room = useAppSelector((state) => state.matchOnline.room)
  const roomId = room.match?.roomId
  const navigate = useNavigateWithState()

  const formik = useFormik<CreateRoomFormValues>({
    initialValues: {},
    validate: validateCreateOnlineMatchForm,
    onSubmit: ({ maxPlayersCount }) => {
      dispatch(createMatch({ maxPlayersCount }))
    },
  })

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

          <button className="btn-filled-secondary mt-6" type="submit">
            Create Match
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default CreateOnlineMatchModal
