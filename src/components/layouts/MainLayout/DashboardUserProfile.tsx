import { Link } from 'react-router-dom'
import Shimmer from '@/components/Shimmer'
// import UserIcon from '@/assets/icons/user-circle.svg?react'
import UserImg from '@/assets/images/user.png'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { signOut } from '@/features/auth/authSlice'
import classNames from 'classnames'

const DashboardUserProfile = () => {
  const dispatch = useAppDispatch()
  const userProfile = useAppSelector((state) => state.user.profile)
  const isConnected = useAppSelector((state) => state.socket.connected)

  const handleSignOutClick = () => {
    dispatch(signOut())
  }

  if (userProfile.data) {
    return (
      <div className="card text-center pt-12">
        <div className="p-3 bg-secondary-400 size-20 absolute-center !top-0 rounded-full">
          <img src={UserImg} />
        </div>
        {/* <div className="bg-primary-300/30 backdrop-blur-md shadow-lg size-20 absolute-center !top-0 rounded-full">
          <UserIcon className="size-full" />
        </div> */}
        <p className="text-lg">{userProfile.data.username}</p>
        <p className="text-sm">{userProfile.data.email}</p>
        <p
          className={classNames('text-sm', {
            'text-green-500': isConnected,
            'text-orange-500': !isConnected,
          })}
        >
          {isConnected ? 'Online' : 'Offline'}
        </p>
        <button
          className="btn-filled-red mt-6"
          title="Logout"
          onClick={handleSignOutClick}
        >
          Sign Out
        </button>
      </div>
    )
  }
  if (userProfile.isLoading) {
    return <Shimmer className="h-3/5" />
  }
  return (
    <div className="card">
      <h4>Welcome! </h4>
      <p>Log in or create an account to get started.</p>
      <div className="mt-8 px-4">
        <Link to="/auth/sign-in">
          <button className="btn-outlined w-full">Login</button>
        </Link>
        {/* <div>
          <span className="mx-2">or</span>
        </div> */}
        <div className="my-3 text-center"> OR </div>
        <Link to="/auth/sign-up">
          <button className="btn-filled w-full">Create Account</button>
        </Link>
      </div>
      {/* <Link
        to="/match/offline"
        className="btn-filled bg-white text-black inline-block m-4 p-10 text-xl uppercase text-center"
      >
        Offclick
      </Link> */}
    </div>
  )
}

export default DashboardUserProfile
