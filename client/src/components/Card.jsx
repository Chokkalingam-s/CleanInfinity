export default function Card() {
  return (
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
      </div>
    </div>
  )
}
