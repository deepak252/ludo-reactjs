import { To, useLocation, useNavigate } from 'react-router-dom'

function useNavigateWithState() {
  const navigate = useNavigate()
  const location = useLocation()

  return (to: To | number, { replace }: { replace?: boolean } = {}) => {
    return navigate(to as To, {
      state: { from: location.state },
      replace,
    })
  }
}

export default useNavigateWithState
