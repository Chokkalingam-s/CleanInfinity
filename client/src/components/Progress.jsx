import BarChart from './BarChart'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function Progress() {
  const data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 75]
  return (
    <div className='p-6'>
      <div className='flex mb-6'>
        <img
          src='https://via.placeholder.com/150'
          alt='Profile'
          className='w-1/3 h-48 object-cover mr-4'
        />
        <div className='w-2/3'>
          <input
            type='text'
            placeholder='NFC'
            className='w-full mb-2 p-2 border border-gray-300 rounded'
          />
          <input
            type='text'
            placeholder='NFC'
            className='w-full mb-2 p-2 border border-gray-300 rounded'
          />
          <input
            type='text'
            placeholder='500'
            className='w-full mb-2 p-2 border border-gray-300 rounded'
          />
          <input
            type='text'
            placeholder='500'
            className='w-full mb-2 p-2 border border-gray-300 rounded'
          />
          <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>
            Submit
          </button>
        </div>
      </div>

      <h2 className='text-2xl font-bold mb-4'>Leaderboard</h2>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='flex flex-col items-center'>
          <CircularProgressbar
            value={66}
            text={`66%`}
          />
          <p className='mt-2 font-bold'>User 1</p>
        </div>
        <div className='flex flex-col items-center'>
          <CircularProgressbar
            value={80}
            text={`80%`}
          />
          <p className='mt-2 font-bold'>User 2</p>
        </div>
        <div className='flex flex-col items-center'>
          <CircularProgressbar
            value={45}
            text={`45%`}
          />
          <p className='mt-2 font-bold'>User 3</p>
        </div>
      </div>

      <BarChart data={data} />
    </div>
  )
}
