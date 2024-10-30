import BarChart from './BarChart'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const UserProgress = ({name, value, barStyles}) => (
  <div className='flex flex-col items-center'>
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      styles={{
        ...barStyles,
        trail: {
          stroke: '#50b498'
        }
      }}
    />
    <p className='mt-2 font-bold'>{name}</p>
  </div>
)
const UserProgressGrid = ({users, progressBarStyles}) => (
  <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6'>
    {users.map(user => (
      <UserProgress key={user.name} name={user.name} value={user.value} barStyles={progressBarStyles} />
    ))}
  </div>
)

export default function Progress({data, users, progressBarStyles}) {
  return (
    <div className='container'>
      <div className='flex flex-col md:flex-row gap-y-4 items-center justify-center'>
        <img
          src='https://placehold.co/150'
          alt='Profile'
          className='w-1/2 md:w-1/5 aspect-square object-cover rounded-full shadow mx-auto'
        />
        <div className='w-11/12 md:w-96 mx-auto'>
          <input type='text' placeholder='NFC' />
          <input type='text' placeholder='NFC' />
          <input type='text' placeholder='500' />
          <input type='text' placeholder='500' />
          <button className='btn'>Submit</button>
        </div>
      </div>
      <h2 className='text-xl md:text-2xl font-bold px-5 mb-4'>Leaderboard</h2>
      <UserProgressGrid users={users} progressBarStyles={progressBarStyles} />
      <div className='px-5'>
        <BarChart data={data} />
      </div>
    </div>
  )
}
