import { useState, useEffect } from 'react'
import Card from './Card'
import Article from './Article'

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full border-b-2 border-dark-green'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full text-left py-3 px-4 flex items-center justify-between transition-all duration-200'
      >
        <span className='text-lg font-semibold'>{title}</span>
        <span
          className={
            'ml-2 transform transition-transform duration-300 font-bold'
          }
        >
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen && <div className='py-2 px-4'>{content}</div>}
    </div>
  )
}

export default function Awareness({ src }) {
  const cardsData = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    title: `Card Title ${index + 1}`,
    description: 'This is a description of the card.',
    image: 'https://placehold.co/150',
  }))

  const [showMoreVideos, setShowMoreVideos] = useState(false)
  const [showMoreArticles, setShowMoreArticles] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsMobile(true)
      else setIsMobile(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleShowMoreVideos = () => {
    setShowMoreVideos(!showMoreVideos)
  }

  const handleShowMoreArticles = () => {
    setShowMoreArticles(!showMoreArticles)
  }

  const displayedVideos = isMobile
    ? cardsData.slice(0, showMoreVideos ? 3 : 1)
    : cardsData.slice(0, 3)

  return (
    <div className='mx-auto gap-y-6 flex flex-col items-center justify-center container'>
      <h2 className='text-3xl font-bold'>Guide Me</h2>
      <h3 className='text-xl'>How To Use Our App!</h3>
      <iframe
        src={src}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;'
        allowFullScreen
        className='w-full aspect-video shadow-lg rounded-lg'
      ></iframe>
      <h3 className='text-2xl font-semibold'>How Can We Help You?</h3>
      <div className='relative w-full max-w-md'>
        <img
          src='/magnifying-glass-solid.svg'
          className='w-5 absolute left-3 top-1/2 transform -translate-y-4'
          alt='Search Icon'
        />
        <input
          type='text'
          placeholder='Ask your question'
          className='w-full pl-10 py-3 border border-medium-green rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-light-green'
        />
      </div>

      <h3 className='text-2xl font-semibold'>FAQs</h3>
      <div className='w-full max-w-md'>
        <Accordion
          title='What is this app about?'
          content='This app helps you with Recycling Waste.'
        />
        <Accordion
          title='How do I reset my password?'
          content='You can reset your password from the profile settings.'
        />
        <Accordion
          title='Can I sync my data?'
          content='Yes, data can be synced across devices using your account.'
        />
      </div>

      <h2 className='text-3xl font-bold text-dark-green'>Resources</h2>

      <h3 className='text-xl font-semibold text-dark-green'>Videos</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        {displayedVideos.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
      {isMobile && (
        <button
          onClick={handleShowMoreVideos}
          className='mt-4 px-6 py-2 btn'
        >
          {showMoreVideos ? 'Show Less Videos' : 'Show More Videos'}
        </button>
      )}
      <h3 className='text-3xl font-semibold text-dark-green'>Articles</h3>
      <Article showAll={showMoreArticles} />
      <div className='w-44'>
        <button
          onClick={handleShowMoreArticles}
          className='px-4 py-2 btn'
        >
          {showMoreArticles ? 'Show Less Articles' : 'Show More Articles'}
        </button>
      </div>
    </div>
  )
}
