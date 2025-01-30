import { Outlet } from 'react-router-dom'
import DashboardUserProfile from './DashboardUserProfile'

const MainLayout = () => {
  return (
    <div className="flex relative px-4 h-screen max-w-7xl mx-auto max-lg:h-max">
      <div className="w-1/4 px-4 pt-16 overflow-y-auto custom-scrollbar max-lg:hidden">
        <DashboardUserProfile />
      </div>
      <div className="w-1/2 overflow-y-auto custom-scrollbar max-lg:w-full">
        <div className="m-4 flex justify-end lg:hidden"></div>
        <Outlet />
      </div>
      <div className="w-1/4 px-4 pt-16 overflow-y-auto custom-scrollbar max-lg:hidden">
        {/* <DashboardUserProfile /> */}
      </div>
    </div>
  )
}

export default MainLayout
