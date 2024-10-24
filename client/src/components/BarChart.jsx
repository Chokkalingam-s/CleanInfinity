export default function BarGraph({ data }) {
  const months = []
  const currentDate = new Date()

  // Fill months array with the last 12 months
  for (let i = 11; i >= 0; i--) {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i
    )
    months.push(previousMonth.toLocaleString('default', { month: 'short' }))
  }

  return (
    <div className='flex justify-between items-end h-64'>
      {months.map((month, index) => (
        <div
          key={index}
          className='flex flex-col items-center'
        >
          <div
            style={{
              height: `${data[index]}px`,
              transition: 'height 0.3s ease',
            }}
            className='bg-gradient-to-t from-dark-green to-medium-green rounded-lg shadow-md hover:shadow-lg w-4 md:w-8 lg:w-8'
          ></div>
          <span className='mt-2 text-sm font-medium text-center lg:text-xl'>
            {month}
          </span>
        </div>
      ))}
    </div>
  )
}
