import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
const AuthLayout = lazy(() => import('@/features/auth/components/AuthLayout'))
const SignInPage = lazy(() => import('@/features/auth/pages/SignInPage'))
const SignUpPage = lazy(() => import('@/features/auth/pages/SignUpPage'))

const authRoutes: RouteObject = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: '',
      element: <Navigate to="/auth/sign-in" replace />,
    },
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
    {
      path: 'sign-up',
      element: <SignUpPage />,
    },
  ],
}

export default authRoutes
