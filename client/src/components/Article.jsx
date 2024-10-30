export default function Article({showAll, articles_data}) {
  const displayedArticles = showAll ? articles_data : articles_data.slice(0, window.innerWidth >= 768 ? 2 : 1)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {displayedArticles.map((article, index) => (
        <div key={index} className='flex flex-row max-w-sm rounded-lg shadow-lg overflow-hidden'>
          <img src='https://placehold.co/150' alt='Card Image' className='w-40 h-full object-cover' />
          <div className='p-4 w-full drop flex flex-col justify-between'>
            <h3 className='text-xl font-semibold mb-2'>{article.title}</h3>
            <p className='mb-4'>{article.description}</p>
            <button className='btn px-4 py-2'>Learn More</button>
          </div>
        </div>
      ))}
    </div>
  )
}

