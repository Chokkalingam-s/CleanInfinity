export default function Card({ title, description, image }) {
  return (
<<<<<<< HEAD
    <div className='flex border rounded shadow'>
      <div className='w-3/10'>
        <img
          src='https://placehold.co/150/'
          alt='Card Image'
          className='h-full object-cover'
        />
      </div>
      <div className='w-7/10 p-4'>
        <h3 className='text-xl font-bold'>Card Title</h3>
        <p className='text-sm text-gray-600'>
          This is a description of the card. It can be about anything you want
          to display in this section.
        </p>
=======
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
>>>>>>> 0b16e13df160191590e604409c4dd4aa6c00fce3
      </div>
    </div>
  )
}
