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
          <h2 className='my-2'>Welcome Admin!</h2>
          <div className='mx-auto drop p-6 my-4'>
            <h3 className='mb-4'>Details of Ward</h3>
            <div className='grid grid-cols-3 gap-4'>
              {detailsOfWardsArr.map((info, i) => (
                <p
                  key={i}
                  className='text-sm bg-light-green rounded-md p-2 text-center shadow-sm'>
                  {info}
                </p>
              ))}
            </div>
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
