import { useEffect } from 'react'
import { useAppDispatch, useAppSelector, useNavigateWithState } from '@/hooks'
import BoardOffline from '../components/BoardOffline'
import ExitMatch from '../../../components/ExitMatch'
import { MatchStatus } from '@/constants/enums'
import { resetOfflineMatchState, setMatchState } from '../offlineMatchSlice'
import {
  getOfflineMatch,
  removeOfflineMatch,
  saveOfflineMatch,
} from '@/utils/storage'

function OfflineMatchPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigateWithState()

  useEffect(() => {
    const offlineMatch = getOfflineMatch()
    if (offlineMatch?.status === MatchStatus.InProgress) {
      dispatch(setMatchState(offlineMatch))
    } else {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleExitClick = () => {
    removeOfflineMatch()
    dispatch(resetOfflineMatchState())
    navigate('/')
  }

  return (
    <div className="relative h-screen">
      <div className="flex justify-end">
        <ExitMatch onExitClick={handleExitClick} />
      </div>
      <div className="absolute-center w-full p-10 max-h-screen">
        <BoardOffline />
        <CacheMatch />
      </div>
    </div>
  )
}

const CacheMatch = () => {
  const match = useAppSelector((state) => state.matchOffline.match)
  useEffect(() => {
    if (match.status === MatchStatus.InProgress) {
      saveOfflineMatch(match)
    }
  }, [match])
  return <></>
}

export default OfflineMatchPage
