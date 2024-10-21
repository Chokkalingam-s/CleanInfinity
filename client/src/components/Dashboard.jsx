import BarGraph from './BarChart'

export default function Dashboard() {
  const data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 75]
  return (
    <>
      <div
        className='w-28 items-center font-bold bg-white flex absolute justify-between right-2 p-2 rounded-lg'
        id='credit'
      >
        <img
          src='/coins-solid.svg'
          className='w-10'
        />
        <p>500</p>
      </div>
      <div
        className='bg-slate-400 m-4 ml-20'
        style={{ width: '70%' }}
        id='graph'
      >
        <BarGraph data={data} />
      </div>
      <h3>How to use?</h3>
      <div className='grid grid-cols-3 items-center justify-center '>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              className='p-4 w-11/12 mb-4 items-center justify-center border rounded shadow'
              key={i}
            >
              <img src='https://via.placeholder.com/150' />
              <h3>Title {i + 1}</h3>
            </div>
          ))}
      </div>
    </>
  )
}
