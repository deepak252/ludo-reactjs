import { useAppSelector } from '@/hooks'
import MatchItem from './MatchItem'

const OnlineMatchItem = () => {
  const ongoingMatch = useAppSelector((state) => state.matchOnline.ongoingMatch)

  if (ongoingMatch.isLoading || !ongoingMatch.data) {
    return <div />
  }
  return <MatchItem match={ongoingMatch.data} />
}

export default OnlineMatchItem
