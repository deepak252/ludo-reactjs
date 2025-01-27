import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import authRoutes from './authRoutes'
import RootLayout from '@/components/layouts/RootLayout'
import MainLayout from '@/components/layouts/MainLayout'
import { Spinner } from '@/components/Loader'
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const TempPage = lazy(() => import('@/features/temp/pages/TempPage'))
const OnlineMatchPage = lazy(
  () => import('@/features/matchOnline/pages/OnlineMatchPage')
)
const OfflineMatchPage = lazy(
  () => import('@/features/matchOffline/pages/OfflineMatchPage')
)

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
            // matchRoutes,
            {
              path: '/match/offline',
              element: <OfflineMatchPage />,
            },
          ],
        },
        authRoutes,
        {
          path: 'temp',
          element: <TempPage />,
        },
        {
          path: 'match/online/:roomId',
          element: <OnlineMatchPage />,
        },
      ],
    },
  ])

  return <Suspense fallback={<Spinner center />}>{routes}</Suspense>
}

export default AppRoutes
