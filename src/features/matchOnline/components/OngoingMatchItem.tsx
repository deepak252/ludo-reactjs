import { useAppSelector, useNavigateWithState } from '@/hooks'
import { MatchStatus } from '@/constants/enums'
import TokenGroupImg from '@/assets/images/token-group1.png'

const OngoingMatchItem = () => {
  const ongoingMatch = useAppSelector((state) => state.matchOnline.ongoingMatch)
  const navigate = useNavigateWithState()

  if (ongoingMatch.isLoading || !ongoingMatch.data) {
    return <div />
  }

  return (
    <div className="rounded-2xl bg-primary-400 shadow-sm shadow-secondary-400 border-2 border-secondary">
      <div className="flex items-center p-3">
        <img alt="logo" src={TokenGroupImg} className="size-16 m-3" />
        <div className="flex-grow">
          <p className="text-green-500 text-lg">Ongoing Match</p>
          <p className="me-2 text-xs">Room Id: {ongoingMatch.data.roomId}</p>
          <p className="me-2 text-xs">
            {ongoingMatch.data.joinedPlayersCount} Players
          </p>
        </div>
        {[MatchStatus.Waiting, MatchStatus.InProgress].includes(
          ongoingMatch.data.status
        ) && (
          <button
            onClick={() => {
              navigate(`/match/online/${ongoingMatch.data?.roomId}`)
            }}
            className="btn-filled-green py-2"
          >
            JOIN
          </button>
        )}
      </div>
      {/* <div className="bg-primary rounded-br-2xl rounded-bl-2xl">
          <div className="flex px-3 py-1">
            <p>{match.joinedPlayersCount}</p>
          </div>
        </div> */}
    </div>
  )
  // return (
  //   <MatchItem
  //     match={ongoingMatch.data}
  //     onJoinClick={() => {
  //       navigate(`/match/online/${ongoingMatch.data?.roomId}`)
  //     }}
  //   />
  // )
}

export default OngoingMatchItem
