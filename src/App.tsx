/// <reference types="vite-plugin-svgr/client" />
import { Route, Routes } from 'react-router-dom'
import OfflineMatchPage from '@/features/matchOffline/pages/OfflineMatchPage'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/layouts/MainLayout'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <AppRoutes />
      {/* <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/offline" element={<OfflineMatchPage />} />
          <Route path="/live" element={<OfflineMatchPage />} />
        </Route>
      </Routes> */}
    </>
  )
}

export default App
