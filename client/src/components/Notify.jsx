import {useState} from 'react'
import {dummyNotifications} from '../data/config'

export default function Notify() {
  const [yearExpanded, setYearExpanded] = useState({})
  const [monthExpanded, setMonthExpanded] = useState({})

  const toggleYear = year => {
    setYearExpanded(prevState => {
      const newState = {...prevState}
      newState[year] = !prevState[year]
      return newState
    })
  }

  const toggleMonth = month => {
    setMonthExpanded(prevState => {
      const newState = {...prevState}
      newState[month] = !prevState[month]
      return newState
    })
  }

  return (
    <div className='container flex flex-col relative'>
      <h1 className='text-3xl font-bold fixed top-14 left-1/2 -translate-x-1/2 z-10'>Notify</h1>
      {Object.entries(dummyNotifications).reverse().map(([year, months]) => (
        <div key={year} className='flex flex-col mt-12'>
          <YearToggle year={year} expanded={yearExpanded[year]} onClick={toggleYear} />
          {yearExpanded[year] && (
            <div className='flex flex-col pl-4'>
              {Object.entries(months).reverse().map(([month, days]) => (
                <div key={month} className='flex flex-col'>
                  <MonthToggle
                    month={month}
                    expanded={monthExpanded[month]}
                    onClick={toggleMonth}
                  />
                  {monthExpanded[month] && (
                    <div className='flex flex-col pl-4'>
                      {days
                        .slice()
                        .reverse()
                        .map(({date, notifications}) => (
                          <NotificationList key={date} date={`${month} ${date}`} notifications={notifications.slice().reverse()} />
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const YearToggle = ({year, expanded, onClick}) => (
  <div className='flex items-center justify-between px-4 py-2 rounded-lg drop mb-2 shadow'>
    <p className='font-bold text-2xl'>{year}</p>
    <button className='text-xs font-bold text-dark-green/80 tracking-wide' onClick={() => onClick(year)}>
      {expanded ? 'Hide' : 'Show'}
    </button>
  </div>
)

const MonthToggle = ({month, expanded, onClick}) => (
  <div className='flex items-center justify-between px-4 py-2 rounded-lg drop mb-2 shadow'>
    <p className='font-bold text-xl'>{month}</p>
    <button className='text-xs font-bold text-dark-green/80 tracking-wide' onClick={() => onClick(month)}>
      {expanded ? 'Hide' : 'Show'}
    </button>
  </div>
)

const NotificationList = ({date, notifications}) => (
  <div className='flex flex-col ml-2'>
    <p className='font-bold text-xl'>{date}</p>
    {notifications.map(notification => (
      <NotificationItem key={notification.timestamp} {...notification} />
    ))}
  </div>
)

const NotificationItem = ({timestamp, message, title}) => (
  <div className='flex items-center justify-between px-6 py-2 rounded-lg drop ml-2 mb-2 shadow'>
    <div>
      <p className='text-lg font-semibold'>{title}</p>
      <p className='text-md'>{message}</p>
    </div>
    <p className='text-xs font-bold text-dark-green/80 tracking-wide'>{timestamp}</p>
  </div>
)


