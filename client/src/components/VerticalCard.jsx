export default function VerticalCard({ titles }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center w-full max-w-4xl'>
      {titles.map((title, i) => (
        <div
          className='p-4 flex flex-col items-center justify-center bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
          key={i}
        >
          <img
            src='https://via.placeholder.com/150'
            className='w-full h-32 object-cover rounded-lg mb-4'
            alt={`${title} Image`}
          />
          <p className='font-medium text-lg text-center'>{title}</p>
        </div>
      ))}
    </div>
  );
}
