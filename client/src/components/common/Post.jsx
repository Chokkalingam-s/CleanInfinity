import {useState} from "react"

export default function Post({name, time, image, description}) {
  const [liked, setLiked] = useState(false)
  const imageUrl = image
    ? `http://localhost:5000/${image}`
    : "https://placehold.co/50"

  return (
    <div className='bg-light-green/50 drop-shadow-sm p-4 rounded-xl shadow-lg my-4 mx-4 md:mx-16'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <img
            src='https://placehold.co/50'
            alt='Profile'
            className='w-12 h-12 object-cover shadow-lg rounded-full mr-4'
          />
          <h4 className='font-bold'>{name}</h4>
        </div>
        <p className='font-extrabold'>. . .</p>
      </div>
      <img
        src={imageUrl}
        alt='Post'
        className='w-full h-64 object-contain rounded-lg shadow-lg my-4'
      />
      <div className='mt-4 ml-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-4'>
            <img
              src={liked ? "/heart-solid.svg" : "/heart-regular.svg"}
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
