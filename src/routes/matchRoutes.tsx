import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const MatchLayout = lazy(() => import('@/components/layouts/MatchLayout'))
const OnlineMatchPage = lazy(
  () => import('@/features/matchOnline/pages/OnlineMatchPage')
)
const OfflineMatchPage = lazy(
  () => import('@/features/matchOffline/pages/OfflineMatchPage')
)

const matchRoutes: RouteObject = {
  path: 'match',
  element: <MatchLayout />,
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
