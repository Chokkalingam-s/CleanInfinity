import {useState} from 'react'
export default function PingMe() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className='flex flex-col items-center container max-w-md'>
      <div className='drop p-4'>
        <h1 className='text-3xl font-bold mb-4'>Ping Me - Contact Us</h1>
        <div className='flex flex-col w-full'>
          <input type='text' placeholder='Your name' value={name} onChange={e => setName(e.target.value)} />
          <input type='text' placeholder='Problem subject' value={subject} onChange={e => setSubject(e.target.value)} />
          <span className='flex items-center relative'>
            <textarea
              placeholder='Brief description'
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}></textarea>
            <input type='file' multiple className='hidden' />
            <span className='cursor-pointer absolute inset-0 flex items-center justify-center w-24 aspect-square rounded-full bg-gray-200'>
              Add images
            </span>
          </span>
          <button className='btn'>Submit</button>
        </div>
      </div>
    </div>
  )
}
