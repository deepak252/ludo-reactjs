import { MatchStatus } from '@/constants/enums'
import { MatchOnline } from '../onlineMatch.types'
// import LogoImg from '@/assets/images/logo2.png'

type MatchItemProps = {
  match: MatchOnline
  onJoinClick?: () => void
}

const MatchItem = ({ match }: MatchItemProps) => {
  return (
    <div className="rounded-2xl bg-primary-500 shadow-sm">
      <div className="flex p-3">
        {/* <img alt="logo" src={LogoImg} className="size-16 rounded-md" /> */}
        <div className="me-2">{match.roomId}</div>
        {[MatchStatus.Waiting, MatchStatus.InProgress].includes(
          match.status
        ) && <button className="btn-filled-green py-2">JOIN</button>}
      </div>
      {/* <div className="bg-primary rounded-br-2xl rounded-bl-2xl">
        <div className="flex px-3 py-1">
          <p>{match.joinedPlayersCount}</p>
        </div>
      </div> */}
    </div>
  )
}

export default MatchItem
