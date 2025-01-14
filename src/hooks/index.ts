import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import useFormikErrors from './useFormikErrors'
import useSignedIn from './useSignedIn'
import useWindowDimensions from './useWindowDimensions'
import useNavigateWithState from './useNavigateWithState'

export {
  useFormikErrors,
  useSignedIn,
  useWindowDimensions,
  useNavigateWithState,
}

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
