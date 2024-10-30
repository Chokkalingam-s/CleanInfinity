import {dummyNotifications} from '../data/config'

const NotificationItem = ({timestamp, message, title}) => (
  <div className='flex items-center justify-between px-6 py-2 rounded-lg drop ml-2 mb-2 shadow'>
    <div>
      <p className='text-lg font-semibold'>{title}</p>
      <p className='text-md'>{message}</p>
    </div>
    <p className='text-xs font-bold text-dark-green/80 tracking-wide'>{timestamp}</p>
  </div>
)

const NotificationList = ({date, notifications}) => (
  <div className='flex flex-col ml-2'>
    <p className='font-bold text-xl'>{date}</p>
    {notifications.slice().map(notification => (
      <NotificationItem key={notification.timestamp} {...notification} />
    ))}
  </div>
)

export default function Notify() {
  return (
    <div className='container flex flex-col relative'>
      <h1 className='text-3xl font-bold fixed top-14 left-1/2 -translate-x-1/2 z-10'>Notify</h1>
      {Object.entries(dummyNotifications)
        .reverse()
        .map(([year, months]) => (
          <div key={year} className='flex flex-col mt-12'>
            <p className='font-bold text-2xl'>{year}</p>
            {Object.entries(months)
              .reverse()
              .map(([month, days]) => (
                <div key={month} className='flex flex-col pl-4'>
                  <p className='font-bold text-xl'>{month}</p>
                  {[...days].reverse().map(({date, notifications}) => (
                    <NotificationList key={date} date={date} notifications={[...notifications].reverse()} />
                  ))}
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}
