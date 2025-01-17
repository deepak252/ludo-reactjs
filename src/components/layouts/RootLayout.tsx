import { Outlet } from 'react-router-dom'
import AppToast from './AppToast'

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <AppToast />
    </div>
  )
}

export default RootLayout
