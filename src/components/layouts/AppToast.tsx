import { useAppDispatch, useAppSelector } from '@/hooks'
import Toast from '../Toast'
import { setAuthToast } from '@/features/auth/authSlice'

const AppToast = () => {
  const dispatch = useAppDispatch()
  const authToastData = useAppSelector((state) => state.auth.toastData)

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
    </div>
  )
}

export default AppToast
