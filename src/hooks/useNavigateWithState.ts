import { To, useLocation, useNavigate } from 'react-router-dom'

function useNavigateWithState() {
  const navigate = useNavigate()
  const location = useLocation()

  return (to: To, { replace }: { replace?: boolean } = {}) =>
    navigate(to, { state: { from: location }, replace })
}

export default useNavigateWithState
