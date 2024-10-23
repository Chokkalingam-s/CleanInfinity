export default function BarGraph({ data }) {
  const months = [];
  const currentDate = new Date();

  // Fill months array with the last 12 months
  for (let i = 11; i >= 0; i--) {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i
    );
    months.push(previousMonth.toLocaleString('default', { month: 'short' }));
  }

  return (
    <div className='flex justify-around items-end h-64 p-4' style={{ padding: '5%' }}>
      {months.map((month, index) => (
        <div key={index} className='flex flex-col items-center'>
          <div
            style={{
              height: `${data[index]}px`,
              width: '1.5rem', // Thinner bar width
              maxWidth: '1.5rem',
              transition: 'height 0.3s ease', // Smooth height transition
            }}
            className='bg-gradient-to-t from-blue-500 to-green-500 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out'
          ></div>
          <span className='mt-2 text-sm font-bold text-center'>{month}</span>
        </div>
      ))}
    </div>
  );
}
