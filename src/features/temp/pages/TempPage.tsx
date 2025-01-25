import { useAppDispatch } from '@/hooks'
import { startTask } from '../tempSlice'

const TempPage = () => {
  const dispatch = useAppDispatch()
  const handleStartClick = () => {
    dispatch(startTask())
    // dispatch({ type: 'REQUEST' })
  }
  return (
    <div>
      <div>TempPage</div>
      <button className="btn-filled" onClick={handleStartClick}>
        Start
      </button>
    </div>
  )
}

export default TempPage
