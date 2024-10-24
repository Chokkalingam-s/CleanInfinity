export default function NFCCard({ titles }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center w-full max-w-4xl middle'>
      {titles.map((title, i) => (
        <div
          className='p-2 flex flex-col items-center justify-center bg-light-green rounded-lg shadow-xl hover:shadow-md transition-shadow duration-300'
          key={i}
        >
          <img
            src='https://placehold.co/150'
            className='w-full h-32 object-cover rounded-lg mb-4 shadow-lg'
            alt={`${title} Image`}
          />
          <p className='font-medium text-lg text-center'>{title}</p>
        </div>
      ))}
    </div>
  )
}
