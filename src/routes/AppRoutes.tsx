import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import authRoutes from './authRoutes'
import RootLayout from '@/components/layouts/RootLayout'
import MainLayout from '@/components/layouts/MainLayout'
import { Spinner } from '@/components/Loader'
import matchRoutes from './matchRoutes'
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const TempPage = lazy(() => import('@/features/temp/pages/TempPage'))

function AppRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <Dashboard />,
            },
          ],
        },
        authRoutes,
        matchRoutes,
        {
          path: 'temp',
          element: <TempPage />,
        },
      ],
    },
  ])

  return <Suspense fallback={<Spinner center />}>{routes}</Suspense>
}

export default AppRoutes
