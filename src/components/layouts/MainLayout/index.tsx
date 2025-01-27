import { Outlet } from 'react-router-dom'
import DashboardUserProfile from './DashboardUserProfile'

const MainLayout = () => {
  return (
    <div className="relative px-4">
      <div className="w-1/4 p-6 fixed top-10 left-0 bottom-0 max-lg:hidden">
        <DashboardUserProfile />
      </div>
      <div className="w-1/2 mx-auto max-lg:w-full">
        <Outlet />
      </div>
      <div className="w-1/4 p-6 fixed top-10 right-0 bottom-0 max-lg:hidden">
        {/* <DashboardUserProfile /> */}
      </div>
    </div>
  )
}

export default MainLayout
