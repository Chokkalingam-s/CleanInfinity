export default function Card({ title, description, image }) {
  return (
    <div className='flex flex-col max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg'>
      <img
        src={image}
        alt='Card Image'
        className='w-full h-40 object-cover'
      />
      <div className='p-4 bg-light-green'>
        <h3 className='text-2xl font-semibold mb-2'>{title}</h3>
        <p className='mb-4'>{description}</p>
        <button className='btn px-4 py-2'>Learn More</button>
      </div>
    </div>
  )
}
