export default function Leaderboard({leaderboardData}) {
  return (
    <div className='w-full'>
      <h2 className='mb-4'>Leaderboard</h2>
      <ol className='list'>
        {leaderboardData.map(({name, score, image}, index) => (
          <li
            key={index}
            className='mb-4 grid grid-cols-[20%_10%_35%_35%] items-center p-2 justify-center font-bold drop'>
            <p className='rank'>{index + 1}</p>
            <img src={image} className='w-10 h-10 rounded-full' />
            <p className='name'>{name}</p>
            <p className='points'>{score} pts</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
