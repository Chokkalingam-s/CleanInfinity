export default function BarGraph({ data }) {
  const months = []
  const currentDate = new Date()

  for (let i = 0; i < 12; i++) {
    const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
    months.push(nextMonth.toLocaleString('default', { month: 'short' }))
  }

  return (
    <div className='flex justify-between items-end h-64'>
      {months.map((month, index) => (
        <div
          key={index}
          className='flex flex-col items-center'
        >
          <div
            style={{ height: `${data[index]}%` }}
            className='w-8 bg-green-500'
          ></div>
          <span className='mt-2 text-sm'>{month}</span>
        </div>
      ))}
    </div>
  )
}
