export default function Leaderboard({leaderboardData}) {
  return (
    <div className='w-full'>
      <h2 className='mb-4'>Leaderboard</h2>
      <ol className='list'>
        {leaderboardData.map(({name, score, image}, index) => (
          <li
            key={index}
            className='w-11/12 mx-auto mb-4 grid grid-cols-3 items-center gap-x-4 p-2 justify-center font-bold drop'>
            <p className='rank'>{index + 1}</p>
            <span className='grid grid-cols-2 gap-x-2 items-center justify-center'>
              <img
                src={image}
                alt={`${name}'s avatar`}
                className='w-10 h-10 rounded-full'
              />
              <p className='name'>{name}</p>
            </span>
            <p className='points'>{score} pts</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
