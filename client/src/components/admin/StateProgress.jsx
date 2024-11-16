import Leaderboard from "../common/Leaderboard"

export default function StateProgress({wardRank, leaderboardData, stateName}) {
  const getOrdinalSuffix = rank => {
    const j = rank % 10,
      k = rank % 100
    if (j === 1 && k !== 11) return "st"
    if (j === 2 && k !== 12) return "nd"
    if (j === 3 && k !== 13) return "rd"
    return "th"
  }

  return (
    <div className='container flex flex-col items-center justify-center'>
      <div className='w-11/12 drop px-6 py-4'>
        <h2 className='mb-4 text-xl font-semibold'>State Progress</h2>
        <div className='drop p-6 mb-4'>
          <p className='text-lg font-medium text-center'>
            <h3 className='block text-4xl font-bold'>
              {wardRank}
              {getOrdinalSuffix(wardRank)}
            </h3>
            <span className='block mt-2 text-light'>
              Ranking Of Your Ward In Your State ~ {stateName}
            </span>
          </p>
        </div>
        <div className='relative overflow-hidden'>
          <div className='overflow-y-auto max-h-96 rounded-lg pb-6'>
            <Leaderboard
              leaderboardData={leaderboardData}
              wardRank={wardRank}
            />
          </div>
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-medium-green/20 to-transparent h-6 backdrop-blur-md '></div>
        </div>
      </div>
    </div>
  )
}
