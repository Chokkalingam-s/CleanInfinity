export default function NFCCard({cards}) {
  return (
    <div className='flex p-2 gap-4 items-center'>
      {cards.map((card, i) => (
        <div
          className='p-4 flex flex-col items-center justify-center drop rounded-lg shadow-lg hover:shadow-md transition-shadow duration-150 w-41'
          key={i}
        >
          <img 
            src={card.image} 
            className='w-half h-36 object-cover rounded-lg shadow-md mb-4' 
            alt={`${card.title} Image`} 
          />
          <h3 className='font-semibold text-center'>{card.title}</h3>
        </div>
      ))}
    </div>
  )
}
