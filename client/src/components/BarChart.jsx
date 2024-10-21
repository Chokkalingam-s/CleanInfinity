export default function BarGraph({ data }) {
  const months = []
  const currentDate = new Date()
  for (let i = 0; i < 12; i++) {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + i
    )
    months.push(nextMonth.toLocaleString('default', { month: 'short' }))
  }

  return (
    <div className='flex justify-around items-end h-64 p-4'>
      {months.map((month, index) => (
        <div
          key={index}
          className='flex flex-col items-center'
        >
          <div
            style={{ height: `${data[index]}px` }}
            className='w-8 bg-medium-green rounded-lg hover:bg-dark-green'
          ></div>
          <span className='mt-2 text-sm font-bold'>{month}</span>
        </div>
      ))}
    </div>
  )
}
