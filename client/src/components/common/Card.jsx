export default function Card({title, description, image, buttonEnable = true}) {
  return (
    <div className='w-full flex flex-col max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg'>
      <img
        src={image}
        alt='Card Image'
        className='w-full aspect-video object-cover'
      />
      <div className={`${buttonEnable ? "p-4" : "p-2"} drop`}>
        <h3 className='text-2xl font-semibold mb-2'>{title}</h3>
        <p className={buttonEnable ? "mb-4" : "mb-2"}>{description}</p>
        {buttonEnable && <button className='btn px-4 py-2'>Learn More</button>}
      </div>
    </div>
  )
}
