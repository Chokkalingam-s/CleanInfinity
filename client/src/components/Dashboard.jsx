import BarGraph from './BarChart'

export default function Dashboard({ creditVal, BarGraphVals }) {
  const titles = [
    'Knowledge',
    'Progress',
    'Pair Dustbin',
    'Notify',
    'PingMe',
    'Activity',
  ]
  return (
    <>
      <div
        className='w-28 items-center font-bold flex fixed justify-between right-2 p-2 rounded-lg bg-medium-green text-white'
        id='credit'
      >
        <img
          src='/coins-solid.svg'
          className='w-6 shadow'
        />
        <p>{creditVal}</p>
      </div>
      <div className='flex items-center justify-center flex-col'>
        <div
          className='rounded-md shadow-lg p-5 bg-light-green'
          style={{ width: '70%' }}
          id='graph'
        >
          <BarGraph data={BarGraphVals} />
        </div>
        <h3>How to use?</h3>
        <div className='w-[70%] grid grid-cols-4 items-center justify-center'>
          {titles.map((title, i) => (
            <div
              className='p-4 w-11/12 mb-4 items-center justify-center border rounded shadow-lg hover:shadow-md'
              key={i}
            >
              <img
                src='https://via.placeholder.com/150'
                className='rounded-lg'
              />
              <p className='font-medium text-xl text-center'>{title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
