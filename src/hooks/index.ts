import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import useFormikErrors from './useFormikErrors'
import useAuth from './useAuth'
import useWindowDimensions from './useWindowDimensions'
import useNavigateWithState from './useNavigateWithState'

export { useFormikErrors, useAuth, useWindowDimensions, useNavigateWithState }

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
