import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <h1 className="text-white text-center py-8">Ludo</h1>
      <div className="flex justify-center mt-10">
        <Link
          to="/live"
          className="btn-filled bg-secondary inline-block m-4 p-10 text-xl uppercase text-center"
        >
          Play Online
        </Link>

        <Link
          to="/offline"
          className="btn-filled bg-white text-black inline-block m-4 p-10 text-xl uppercase  text-center"
        >
          Play Offline
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
