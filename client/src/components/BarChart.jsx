export default function BarGraph({ data }) {
  const months = []
  const currentDate = new Date()
  for (let i = 11; i >= 0; i--) {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i
    )
    months.push(previousMonth.toLocaleString('default', { month: 'short' }))
  }
  return (
    <div className='w-full max-w-4xl rounded-md shadow-lg py-2 drop'>
      <div className='flex justify-between items-end h-44 px-4'>
        {months.map((month, index) => (
          <div
            key={index}
            className='flex flex-col items-center'
          >
            <div
              style={{
                height: `${data[index]}px`,
                transition: 'height 0.3s ease'
              }}
              className='bg-gradient-to-t from-dark-green/90 to-medium-green rounded-lg shadow-xl hover:shadow-lg w-4 md:w-8 lg:w-8'
            ></div>
            <span className='mt-2 text-sm font-semibold lg:text-xl'>
              {month}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
