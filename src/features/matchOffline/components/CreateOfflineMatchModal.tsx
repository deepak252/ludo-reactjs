import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useFormik } from 'formik'
import ModalWrapper from '@/components/ModalWrapper'
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks'
import { startMatch } from '../offlineMatchSlice'
import { MatchStatus } from '@/constants/enums'

type CreateOfflineMatchModalProps = {
  onClose: () => void
}
const CreateOfflineMatchModal = ({ onClose }: CreateOfflineMatchModalProps) => {
  const dispatch = useAppDispatch()
  const matchStatusRef = useRef(MatchStatus.Waiting)
  const matchStatus = useAppSelector((state) => state.matchOffline.match.status)
  const navigate = useNavigateWithState()

  const formik = useFormik<{ playersCount: number }>({
    initialValues: { playersCount: 4 },
    // validate: validateCreateOnlineMatchForm,
    onSubmit: ({ playersCount }) => {
      dispatch(startMatch({ playersCount }))
    },
  })

  useEffect(() => {
    if (
      matchStatus === MatchStatus.InProgress &&
      matchStatusRef.current !== matchStatus
    ) {
      matchStatusRef.current = matchStatus
      navigate(`/match/offline`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchStatus])

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
                    active: formik.values.playersCount === count,
                  }
                )}
                onClick={() => formik.setFieldValue('playersCount', count)}
              >
                {count}
              </div>
            ))}
          </div>

          <button className="btn-filled-secondary mt-6" type="submit">
            Create Match
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default CreateOfflineMatchModal
