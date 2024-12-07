import { Link } from 'react-router-dom'

export default function VerticalCard({ titles }) {
  return (
    <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 items-center gap-4 max-w-4xl'>
      {titles.map(({ title, path, icon }) => (
        <Link to={path} key={path}>
          <div className='p-2 w-28 flex flex-col items-center justify-center drop rounded-lg shadow-lg hover:shadow-md transition-shadow'>
            <img
              src={icon}
              className='h-24 object-cover rounded-lg mb-2 shadow-md'
              alt={`${title} Image`}
            />
            <p className='font-medium text-center'>{title}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
