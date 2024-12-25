/// <reference types="vite-plugin-svgr/client" />
import { Route, Routes } from 'react-router-dom'
import OfflineMatchPage from '@/features/matchOffline/pages/OffilneMatchPage'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/layouts/MainLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/offline" element={<OfflineMatchPage />} />
          <Route path="/live" element={<OfflineMatchPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
