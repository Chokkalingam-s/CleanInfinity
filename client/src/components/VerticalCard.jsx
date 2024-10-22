export default function VerticalCard({ titles }) {
  return (
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
  )
}
