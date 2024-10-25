import { useState, useEffect } from 'react'
import Card from './Card'
import Article from './Article'

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full border-b border-green-500'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full text-left py-3 px-4 flex items-center justify-between text-green-700 transition-all duration-300'
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

export default function Awareness() {
  const cardsData = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    title: `Card Title ${index + 1}`,
    description: 'This is a description of the card.',
    image: 'https://placehold.co/300x150/',
  }))

  const [showMoreVideos, setShowMoreVideos] = useState(false)
  const [showMoreArticles, setShowMoreArticles] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
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
    <div className='relative max-w-4xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center'>
      <h2 className='text-3xl font-bold text-green-600 mb-4'>Guide Me</h2>
      <h3 className='text-xl text-green-700 mb-6'>How To Use Our App!</h3>

      <div className='w-full bg-white p-4 rounded-lg shadow-lg mb-6'>
        <video
          className='w-full h-64 bg-gray-200'
          controls
        >
          {/* Add your video source here */}
        </video>
      </div>

      <h3 className='text-2xl font-semibold text-green-600 mb-4'>
        How Can We Help You?
      </h3>
      <div className='relative w-full max-w-md mb-6'>
        <img
          src='/magnifying-glass-solid.svg'
          className='w-5 absolute left-3 top-1/2 transform -translate-y-1/2'
          alt='Search Icon'
        />
        <input
          type='text'
          placeholder='Ask your question'
          className='w-full pl-10 py-3 border border-green-400 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all'
        />
      </div>

      <h3 className='text-2xl font-semibold text-green-600 mb-4'>FAQs</h3>
      <div className='w-full max-w-md mb-8'>
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

      <h2 className='text-3xl font-bold text-green-600 mb-4'>Resources</h2>

      <h3 className='text-xl font-semibold text-green-600 mb-4'>Videos</h3>
      {/* Grid to show 1 card on mobile and 3 on larger screens */}
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

      {/* Show button only on mobile */}
      {isMobile && (
        <button
          onClick={handleShowMoreVideos}
          className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all'
        >
          {showMoreVideos ? 'Show Less Videos' : 'Show More Videos'}
        </button>
      )}

      <h3 className='text-xl font-semibold text-green-600 mt-8 mb-4'>
        Articles
      </h3>
      <Article showAll={showMoreArticles} />

      {/* Separate button for showing more articles */}
      <button
        onClick={handleShowMoreArticles}
        className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all'
      >
        {showMoreArticles ? 'Show Less Articles' : 'Show More Articles'}
      </button>
    </div>
  )
}
