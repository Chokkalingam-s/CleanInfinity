import Leaderboard from "../common/Leaderboard"

export default function AdminDashboard({
  detailsOfWardsArr,
  leaderboard,
  totalUsersInWard,
}) {
  return (
    <div className='container flex items-center justify-center'>
      <div className='drop px-6 py-2 w-full'>
        <h2 className='my-2'>Welcome Admin!</h2>
        <h3>Details of Ward</h3>
        <div className='flex items-center justify-center gap-x-4 details'>
          {detailsOfWardsArr.map((info, i) => (
            <p key={i}>{info}</p>
          ))}
        </div>
        <div className='ward-users'>
          <p className='text-lg font-medium'>
            Total Users in Ward on Board {totalUsersInWard}
          </p>
        </div>
        <Leaderboard leaderboardData={leaderboard} />
      </div>
    </div>
  )
}
