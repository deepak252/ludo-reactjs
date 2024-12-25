import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="bg-primary h-screen p-4">
      <Outlet />
    </div>
  )
}

export default MainLayout
