/// <reference types="vite-plugin-svgr/client" />
import { Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App
