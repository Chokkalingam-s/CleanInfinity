export default function Leaderboard({leaderboardData, wardRank}) {
  const getOrdinalSuffix = rank => {
    const j = rank % 10,
      k = rank % 100
    if (j === 1 && k !== 11) return "st"
    if (j === 2 && k !== 12) return "nd"
    if (j === 3 && k !== 13) return "rd"
    return "th"
  }

  return (
    <div className='w-full'>
      <h3 className='mb-4 text-xl font-semibold'>Leaderboard</h3>
      <ol className='list font-bold'>
        {leaderboardData.map(({name, score}, index) => {
          const rank = index + 1
          const isHighlighted = rank === wardRank
          return (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-md mb-2 shadow-sm ${
                isHighlighted
                  ? "bg-medium-green font-bold text-lightest-green"
                  : "drop odd:bg-light"
              }`}>
              <span>
                {rank}
                {getOrdinalSuffix(rank)}
              </span>
              <span>{name}</span>
              <span className='text-right'>{score} pts</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
