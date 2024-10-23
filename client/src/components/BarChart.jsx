export default function BarGraph({ data }) {
  const months = [];
  const currentDate = new Date();
  
  // Adjust loop to fill months array with the last 12 months
  for (let i = 11; i >= 0; i--) {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i
    );
    months.push(previousMonth.toLocaleString('default', { month: 'short' }));
  }

  return (
    <div className='flex justify-around items-end h-64 p-4 mt-4'>
      {months.map((month, index) => (
        <div key={index} className='flex flex-col items-center'>
          <div
            style={{ height: `${data[index]}px` }}
            className='w-8 bg-medium-green rounded-lg hover:bg-dark-green shadow-lg'
          ></div>
          <span className='mt-2 text-sm font-bold'>{month}</span>
        </div>
      ))}
    </div>
  );
}

