import {useState} from 'react'

function Post({name, time, image, description}) {
  const [liked, setLiked] = useState(false)
  return (
    <div className='bg-light-green/50 drop-shadow-sm p-4 rounded-xl shadow-lg my-4 mx-4 md:mx-16'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <img src={image} alt='Profile' className='w-12 h-12 object-cover shadow-lg rounded-full mr-4' />
          <h4 className='font-bold'>{name}</h4>
        </div>
        <p className='font-extrabold'>. . .</p>
      </div>
      <img src={image} alt='Post' className='w-full h-64 object-cover rounded-lg shadow-lg my-4' />
      <div className='mt-4 ml-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-4'>
            <img
              src={liked ? '/heart-solid.svg' : '/heart-regular.svg'}
              alt='Like'
              className='w-6 cursor-pointer shadow-lg'
              onClick={() => setLiked(!liked)}
            />
            <img src='/comment-solid.svg' alt='Comment' className='w-6' />
            <img src='/paper-plane-solid.svg' alt='Share' className='w-5' />
          </div>
        </div>
        <div className='mt-2 flex flex-col items-start'>
          <p className=''>{description}</p>
          <p className='text-sm text-medium-green'>{time}</p>
        </div>
      </div>
    </div>
  )
}

export default function Activity({posts}) {
  return (
    <div className='container mb-10'>
      <div className='text-2xl font-bold text-center'>Activity</div>
      {posts.map(post => (
        <Post {...post} key={post.name} />
      ))}
      <div className='fixed bottom-4 w-full md:w-7/12 justify-center flex items-center drop gap-x-2 px-4 py-2'>
        <input type='text' placeholder='Type a message...' className='mb-0' />
        <button
          type='submit'
          className='w-10 aspect-square p-2 rounded-xl shadow-lg border-2 border-medium-green cursor-pointer'>
          <img src='/paper-plane-solid.svg' />
        </button>
      </div>
    </div>
  )
}
