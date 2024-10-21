import { useState } from 'react'

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='border-b'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full text-left py-2'
      >
        {title}
      </button>
      {isOpen && <div className='py-2'>{content}</div>}
    </div>
  )
}
function Card() {
  return (
    <div className='flex border rounded shadow'>
      <div className='w-3/10'>
        <img
          src='https://via.placeholder.com/150'
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
export default function Awareness() {
  return (
    <>
      <h2>Guide Me</h2>
      <h3>How To Use Our App!!</h3>
      <div className='w-52 h-2/4 bg-white'>
        <video></video>
      </div>
      <h3>How Can We Help You?</h3>
      <input
        type='text'
        placeholder='Ask your question'
      />
      <h3>FAQs</h3>
      <Accordion
        title='What is this app about?'
        content='This app helps you with XYZ.'
      />
      <Accordion
        title='How do I reset my password?'
        content='You can reset your password from the profile settings.'
      />
      <Accordion
        title='Can I sync my data?'
        content='Yes, data can be synced across devices using your account.'
      />
      <h2>Resources</h2>
      <h3>Videos</h3>
      <Card />
      <Card />
      <Card />
      <button>See more</button>
      <h2>Articles</h2>
      <Card />
      <button>See more</button>
    </>
  )
}
