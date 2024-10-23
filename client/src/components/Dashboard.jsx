import BarGraph from './BarChart';
import VerticalCard from './VerticalCard';

export default function Dashboard({ creditVal, BarGraphVals }) {
  const titles = [
    'Knowledge',
    'Progress',
    'Pair Dustbin',
    'Notify',
    'PingMe',
    'Activity',
  ];

  return (
    <>
      {/* Credit section */}
      <div
        className='w-28 fixed right-4 top-4 flex items-center justify-between p-2 rounded-lg bg-medium-green text-white shadow-lg'
        id='credit'
      >
        <img src='/coins-solid.svg' className='w-6 shadow' alt='Credit Icon' />
        <p className='font-bold'>{creditVal}</p>
      </div>

      {/* Main container with padding for mobile view */}
      <div className='flex flex-col items-center justify-center w-full p-4 md:p-6 lg:p-8'>
        {/* Bar graph section */}
        <div
          className='w-full max-w-4xl rounded-md shadow-lg p-5 bg-light-green mb-8'
          id='graph'
        >
          <BarGraph data={BarGraphVals} />
        </div>

        {/* Section title */}
        <h3 className='text-2xl font-bold text-green-700 mb-6'>How to use?</h3>

        {/* Vertical cards */}
        <VerticalCard titles={titles} />
      </div>
    </>
  );
}
