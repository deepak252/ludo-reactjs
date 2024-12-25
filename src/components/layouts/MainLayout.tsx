import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="bg-primary h-screen p-8 max-sm:px-4">
      <Outlet />
    </div>
  )
}

export default MainLayout
