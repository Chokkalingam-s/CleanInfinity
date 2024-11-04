import { useState, useEffect } from 'react'

function Post({ name, time, image, description }) {
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

export default function Activity({ posts }) {
  const [showPopup, setShowPopup] = useState(false)
  const [newPost, setNewPost] = useState({ text: '', image: null })

  const handleImageChange = (e) => {
    setNewPost({ ...newPost, image: URL.createObjectURL(e.target.files[0]) })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') setShowPopup(false)
  }

  useEffect(() => {
    if (showPopup) {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [showPopup])

  return (
    <div className='container mb-10'>
      <div className='text-2xl font-bold text-center'>Activity</div>
      {posts.map(post => (
        <Post {...post} key={post.name} />
      ))}
      <div className='fixed bottom-4 w-full md:w-7/12 justify-center flex items-center drop gap-x-2 px-4 py-2'>
        <button
          onClick={() => setShowPopup(true)}
          className='btn bg-medium-green text-white p-2 rounded-lg'>
          Create a Post
        </button>
      </div>
      {showPopup && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-xl shadow-lg'>
            <h3 className='text-lg font-bold mb-2'>New Post</h3>
            <textarea
              placeholder='Write something...'
              value={newPost.text}
              onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
              className='w-full mb-2 p-2 border rounded-md'></textarea>
            <input type='file' accept='image/*' onChange={handleImageChange} className='mb-2' />
            {newPost.image && <img src={newPost.image} alt='Preview' className='w-full h-40 object-cover mb-2' />}
            <div className='flex gap-2'>
              <button
                onClick={() => setShowPopup(false)}
                className='btn bg-medium-green text-white flex-grow p-2 rounded-lg'>
                Share
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className='btn bg-red-500 text-white flex-grow p-2 rounded-lg'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

