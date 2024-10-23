

export default function Card({ title, description, image }) {
  return (
    <div className='flex flex-col max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg backdrop-blur-lg bg-white/30'>
      <img
        src={image}
        alt='Card Image'
        className='w-full h-40 object-cover'
      />
      <div className='p-6 backdrop-blur-lg bg-white/20 rounded-lg'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-2'>{title}</h3>
        <p className='text-sm text-gray-600 mb-4'>{description}</p>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300'>
          Learn More
        </button>
      </div>
    </div>
  );
}
