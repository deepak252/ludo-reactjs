import { useAppSelector, useNavigateWithState } from '@/hooks'
import MatchItem from './MatchItem'

const OnlineMatchItem = () => {
  const ongoingMatch = useAppSelector((state) => state.matchOnline.ongoingMatch)
  const navigate = useNavigateWithState()

  if (ongoingMatch.isLoading || !ongoingMatch.data) {
    return <div />
  }
  return (
    <MatchItem
      match={ongoingMatch.data}
      onJoinClick={() => {
        navigate(`/match/online/${ongoingMatch.data?.roomId}`)
      }}
    />
  )
}

export default OnlineMatchItem
