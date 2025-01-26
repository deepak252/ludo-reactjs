import OnlineMatchPage from '@/features/matchOnline/pages/OnlilneMatchPage'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const OfflineMatchPage = lazy(
  () => import('@/features/matchOffline/pages/OfflineMatchPage')
)

const matchRoutes: RouteObject = {
  path: '/match',
  children: [
    {
      path: 'offline',
      element: <OfflineMatchPage />,
    },
    {
      path: 'online/:roomId',
      element: <OnlineMatchPage />,
    },
  ],
}

export default matchRoutes
