import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import authRoutes from './authRoutes'
import RootLayout from '@/components/layouts/RootLayout'
import MainLayout from '@/components/layouts/MainLayout'
import matchRoutes from './matchRoutes'
import { Spinner } from '@/components/Loader'
const Dashboard = lazy(() => import('@/pages/Dashboard'))

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
            matchRoutes,
            authRoutes,
          ],
        },
      ],
    },
  ])

  return <Suspense fallback={<Spinner center />}>{routes}</Suspense>
}

export default AppRoutes
