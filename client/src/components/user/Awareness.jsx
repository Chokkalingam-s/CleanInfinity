import {useState, useEffect} from "react"
import Card from "../common/Card"
import Article from "./Article"

function Accordion({title, content}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full border-b-2 bg-light-green/40 backdrop-blur-sm rounded-lg border-dark-green mb-2'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full text-left py-3 px-4 flex items-center justify-between transition-all duration-200'>
        <span className='font-semibold'>{title}</span>
        <span
          className={
            "ml-2 transform transition-transform duration-300 font-bold text-2xl"
          }>
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && <div className='py-2 px-4'>{content}</div>}
    </div>
  )
}

export default function Awareness({src, data, cardsData}) {
  const [showMoreVideos, setShowMoreVideos] = useState(false)
  const [showMoreArticles, setShowMoreArticles] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsMobile(true)
      else setIsMobile(false)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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
    <div className='mx-auto gap-y-4 flex flex-col items-center justify-center container'>
      <h1 className='font-bold text-3xl'>Guide Me</h1>
      <h3 className='text-xl'>How To Use Our App!</h3>
      <iframe
        src={src}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;'
        allowFullScreen
        className='w-full lg:w-8/12 md:w-8/12 aspect-video shadow-xl rounded-lg relative'></iframe>
      <h2>How Can We Help You?</h2>
      <div className='relative w-full max-w-md'>
        <img
          src='/magnifying-glass-solid.svg'
          className='w-5 absolute right-3 top-1/2 transform -translate-y-4'
        />
        <input type='text' placeholder='Ask your question' />
      </div>
      <h2>FAQs</h2>
      <div className='w-full max-w-md'>
        <Accordion
          title='What is this app about?'
          content='A smart waste tracking app that rewards users for responsible waste disposal.'
        />
        <Accordion
          title='Whats The use of Credit Points?'
          content='You Can Redeem your credit points at Government Services Such as Ration.'
        />
        <Accordion
          title='Can I sync my data?'
          content='Yes, data can be synced across devices using your account.'
        />
      </div>

      <h2 className='text-3xl font-bold'>Resources</h2>
      <h3 className='text-xl font-semibold'>Videos</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        {displayedVideos.map(card => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            link={card.link} 
          />
        ))}
      </div>
      {isMobile && (
        <button onClick={handleShowMoreVideos} className='mt-4 px-6 py-2 btn'>
          {showMoreVideos ? "Show Less Videos" : "Show More Videos"}
        </button>
      )}
      <h3 className='text-3xl font-semibold text-dark-green'>Articles</h3>
      <Article showAll={showMoreArticles} articles_data={data} />
      <div className='w-44'>
        <button onClick={handleShowMoreArticles} className='px-4 py-2 btn'>
          {showMoreArticles ? "Show Less Articles" : "Show More Articles"}
        </button>
      </div>
    </div>
  )
}
