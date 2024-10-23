export default function Article({ showAll }) {
  const articles = [
    { title: 'Article 1', description: 'Description for article 1.' },
    { title: 'Article 2', description: 'Description for article 2.' },
    { title: 'Article 3', description: 'Description for article 3.' },
    { title: 'Article 4', description: 'Description for article 4.' },
  ];

  // Show 1 article on mobile, 2 on medium and larger screens
  const displayedArticles = showAll ? articles : articles.slice(0, window.innerWidth >= 768 ? 2 : 1);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
      {displayedArticles.map((article, index) => (
        <div key={index} className='flex flex-row max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg backdrop-blur-lg bg-white/30'>
          <img
            src='https://placehold.co/300x430/'
            alt='Card Image'
            className='w-40 h-full object-cover'
          />
          <div className='p-4 backdrop-blur-lg bg-white/20 w-full flex flex-col justify-between'>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>{article.title}</h3>
            <p className='text-sm text-gray-600 mb-4'>
              {article.description}
            </p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300'>
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
