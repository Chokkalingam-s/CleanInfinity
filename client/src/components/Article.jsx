export default function Article() {
    return (
      <div className='flex flex-row max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg backdrop-blur-lg bg-white/30'>
        <img
          src='https://placehold.co/300x430/'
          alt='Card Image'
          className='w-40 h-full object-cover'
        />
        <div className='p-4 backdrop-blur-lg bg-white/20 w-full flex flex-col justify-between'>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>Card Title</h3>
          <p className='text-sm text-gray-600 mb-4'>
            This is a description of the card. It can be about anything you want
            to display in this section.
          </p>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300'>
            Learn More
          </button>
        </div>
      </div>
    );
  }
  