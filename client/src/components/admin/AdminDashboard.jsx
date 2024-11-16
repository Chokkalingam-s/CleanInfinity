import Leaderboard from "../common/Leaderboard"

export default function AdminDashboard({
  detailsOfWardsArr,
  leaderboard,
  totalUsersInWard,
}) {
  return (
    <div className='container flex items-center justify-center'>
      <div className='w-4/5 drop px-6 py-4'>
        <div className='w-10/12 mx-auto'>
          <h2 className='my-2 text-2xl font-bold'>Welcome Admin!</h2>
          <div className='w-10/12 mx-auto'>
            <h3 className='text-lg font-semibold '>Details of Ward</h3>
            <span className='flex items-center justify-center gap-x-4 details'>
              {detailsOfWardsArr.map((info, i) => (
                <p key={i} className='text-sm text-gray-700'>
                  {info}
                </p>
              ))}
            </span>
          </div>
          <div className='drop rounded-lg shadow-md p-6 my-4'>
            <p className='text-lg font-medium text-center'>
              <span className='block text-4xl font-bold text-light'>
                {totalUsersInWard}
              </span>
              <span className='block mt-2'>Total Users in Ward on Board</span>
            </p>
          </div>
          <Leaderboard leaderboardData={leaderboard} />
        </div>
      </div>
    </div>
  )
}
