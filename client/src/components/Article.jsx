export default function Article({ showAll }) {
  const articles = [
    { title: 'Article 1', description: 'Description for article 1.' },
    { title: 'Article 2', description: 'Description for article 2.' },
    { title: 'Article 3', description: 'Description for article 3.' },
    { title: 'Article 4', description: 'Description for article 4.' },
  ]

  const displayedArticles = showAll
    ? articles
    : articles.slice(0, window.innerWidth >= 768 ? 2 : 1)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {displayedArticles.map((article, index) => (
        <div
          key={index}
          className='flex flex-row max-w-sm rounded-lg shadow-lg overflow-hidden'
        >
          <img
            src='https://placehold.co/150'
            alt='Card Image'
            className='w-40 h-full object-cover'
          />
          <div className='p-4 w-full bg-light-green flex flex-col justify-between'>
            <h3 className='text-xl font-semibold mb-2'>{article.title}</h3>
            <p className='mb-4'>{article.description}</p>
            <button className='btn px-4 py-2'>Learn More</button>
          </div>
        </div>
      ))}
    </div>
  )
}
