/// <reference types="vite-plugin-svgr/client" />
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { startMatch } from './slices/matchSlice'

function App() {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const playerCount = searchParams.get('count') || 4
  useEffect(() => {
    if (!isNaN(Number(playerCount))) {
      dispatch(startMatch({ playerCount: Number(playerCount) }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCount])
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App
