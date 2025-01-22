import { Outlet } from 'react-router-dom'
import AppToast from './AppToast'
import { useEffect } from 'react'
import SocketService from '@/services/socket'

const RootLayout = () => {
  useEffect(() => {
    SocketService.connect()
    return () => {
      SocketService.disconnect()
    }
  }, [])

  return (
    <div>
      <Outlet />
      <AppToast />
    </div>
  )
}

export default RootLayout
