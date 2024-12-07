export default function Card({title, description, image,link, buttonEnable = true}) {
  return (
    <div className='w-full flex flex-col max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg'>
      <iframe 
          src={image} 
          title='YouTube video player' 
          frameBorder='0' 
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
          allowFullScreen 
          className='w-full h-full'
        ></iframe>
      <div className={`${buttonEnable ? "p-4" : "p-2"} drop`}>
        <h3 className='text-2xl font-semibold mb-2'>{title}</h3>
        <p className={buttonEnable ? "mb-4" : "mb-2"}>{description}</p>
        {buttonEnable && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className='btn px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 no-underline'
          >
            View Video and Learn More
          </a>
        )}</div>
    </div>
  )
}
