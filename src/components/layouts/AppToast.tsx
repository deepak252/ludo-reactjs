import { useAppDispatch, useAppSelector } from '@/hooks'
import Toast from '../Toast'
import { setAuthToast } from '@/features/auth/authSlice'
import { setOnlineMatchToast } from '@/features/matchOnline/onlineMatchSlice'
import { setUserToast } from '@/features/user/userSlice'

const AppToast = () => {
  const dispatch = useAppDispatch()
  const authToastData = useAppSelector((state) => state.auth.toastData)
  const userToastData = useAppSelector((state) => state.user.toastData)
  const onlineMatchToastData = useAppSelector(
    (state) => state.matchOnline.toastData
  )

  return (
    <div>
      {authToastData?.message && (
        <Toast
          type={authToastData.type}
          message={authToastData.message}
          onClose={() => {
            dispatch(setAuthToast({}))
          }}
        />
      )}
      {userToastData?.message && (
        <Toast
          type={userToastData.type}
          message={userToastData.message}
          onClose={() => {
            dispatch(setUserToast({}))
          }}
        />
      )}
      {onlineMatchToastData?.message && (
        <Toast
          type={onlineMatchToastData.type}
          message={onlineMatchToastData.message}
          onClose={() => {
            dispatch(setOnlineMatchToast({}))
          }}
        />
      )}
    </div>
  )
}

export default AppToast
