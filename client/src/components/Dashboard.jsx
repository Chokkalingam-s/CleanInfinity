import BarGraph from './BarChart'
import VerticalCard from './VerticalCard'

export default function Dashboard({ creditVal, BarGraphVals, titles }) {
  return (
    <div className='container'>
      <div className='w-24 flex items-center justify-around p-2 rounded-lg mb-4 bg-medium-green shadow-lg text-lightest-green float-right'>
        <img
          src='/coins-solid.svg'
          className='w-6'
          alt='Credit Icon'
        />
        <p className='font-bold'>{creditVal}</p>
      </div>

      <div className='flex flex-col items-center justify-center w-full gap-y-4'>
        <div className='w-full max-w-4xl rounded-md shadow-lg py-2 bg-light-green'>
          <BarGraph data={BarGraphVals} />
        </div>
        <h3 className='text-2xl font-bold'>How to use?</h3>
        <VerticalCard titles={titles} />
      </div>
    </div>
  )
}
