import Card from "../common/Card"

export default function Leaderboard({leaderboardData}) {
  return (
    <div className='leaderboard'>
      <h3>Leaderboard</h3>
      <ol className='list'>
        <span className='flex gap-x-4'>
          {leaderboardData.slice(0, 3).map(({name, score}, index) => (
            <Card
              title={score}
              description={name}
              image={
                "https://images.unsplash.com/photo-1488034976201-ffbaa99cbf5c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              buttonEnable={false}
              key={index}
            />
          ))}
        </span>
        {leaderboardData.slice(3).map(({name, score}, index) => (
          <li key={index + 3}>{`${name} - ${score}`}</li>
        ))}
      </ol>
    </div>
  )
}
