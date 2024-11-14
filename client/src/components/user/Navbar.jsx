import {Link, useLocation} from 'react-router-dom'
import {useState} from 'react'

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const links = [
    {href: '/dashboard', label: 'Dashboard'},
    {href: '/awareness', label: 'Awareness'},
    {href: '/progress', label: 'Progress'},
    {href: '/nfc', label: 'NFC Pairing'},
    {href: '/profile', label: 'Profile'},
    {href: '/', label: 'Log out'}
  ]
  return (
    <header className='fixed top-0 w-full shadow-lg rounded-ee-lg rounded-es-lg bg-medium-green h-12 z-20'>
      <div className='flex items-center justify-between'>
      <Link to="/dashboard">
        <div
          style={{ backgroundImage: 'url(/1.png)' }}
          className="w-24 h-12 bg-contain bg-no-repeat bg-center ml-2"></div>
      </Link>
        <button
          className='lg:hidden md:hidden focus:outline-none bg-transparent w-12'
          onClick={() => setIsOpen(!isOpen)}>
          <img
            src={isOpen ? './xmark-solid.svg' : './bars-solid.svg'}
            className='w-4/12'
          />
        </button>
        <nav
          className={`flex-col absolute right-0 top-12 z-20 rounded-lg ${
            isOpen ? 'flex' : 'hidden'
          } md:flex-row lg:flex-row md:flex lg:flex md:relative md:top-0 lg:relative lg:top-0 bg-medium-green md:bg-transparent lg:bg-transparent`}>
          {links.map(({href, label}) => (
            <Link
              key={href}
              to={href}
              className={`hover:text-dark-green md:text-base lg:text-base transition-colors duration-200 px-4 py-2 ${
                location.pathname === href
                  ? 'text-dark-green text-lg'
                  : 'text-lightest-green'
              }`}
              onClick={() => setIsOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
