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
      path: 'online',
      element: <OfflineMatchPage />,
    },
  ],
}

export default matchRoutes
