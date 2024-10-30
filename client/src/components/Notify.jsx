import {dummyNotifications} from '../data/config'

const NotificationItem = ({timestamp, message}) => (
  <div className='flex items-center justify-between p-4 rounded-lg drop ml-2'>
    <p>{message}</p>
    <p className='text-xs'>{timestamp}</p>
  </div>
)

const NotificationList = ({title, values}) => (
  <div className='flex flex-col ml-2'>
    <p className='font-bold text-2xl'>{title}</p>
    {values.slice().map(({date, notifications}) => (
      <div key={date} className='flex flex-col gap-y-2 ml-2'>
        <p className='font-medium text-xl'>{date}</p>
        {notifications.slice().map(notification => (
          <NotificationItem key={notification.timestamp} {...notification} />
        ))}
      </div>
    ))}
  </div>
)

export default function Notify() {
  return (
    <div className='container flex flex-col relative'>
      <h1 className='text-3xl font-bold fixed top-12 left-1/2 -translate-x-1/2 z-10'>Notify</h1>
      {Object.entries(dummyNotifications)
        .slice()
        .reverse()
        .map(([year, months]) => (
          <div key={year} className='flex flex-col mt-6'>
            <p className='font-bold text-2xl'>{year}</p>
            {Object.entries(months)
              .slice()
              .reverse()
              .map(([month, days]) => (
                <div key={month} className='flex flex-col gap-2 pl-4'>
                  <NotificationList
                    title={month}
                    values={days
                      .slice()
                      .reverse()
                      .map(({date, notifications}) => ({
                        date,
                        notifications: notifications.slice().reverse()
                      }))}
                  />
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}
