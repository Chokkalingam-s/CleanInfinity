export default function VerticalCard({ titles }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-2 items-center justify-center w-full max-w-4xl'>
      {titles.map((title, i) => (
        <div
          className='p-2 w-28 flex flex-col items-center justify-center bg-light-green rounded-lg shadow-xl hover:shadow-md transition-shadow duration-300'
          key={i}
        >
          <img
            src='https://placehold.co/50'
            className='h-24 object-cover rounded-lg mb-4 shadow-lg'
            alt={`${title} Image`}
          />
          <p className='font-medium text-sm text-center'>{title}</p>
        </div>
      ))}
    </div>
  )
}
