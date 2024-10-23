import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/awareness', label: 'Awareness' },
    { href: '/progress', label: 'Progress' },
    { href: '/nfc', label: 'NFC Pairing' },
    { href: '/profile', label: 'Profile' },
    { href: '/', label: 'Log out' },
  ]

  return (
    <header className='fixed top-0 w-full bg-black z-10 shadow-lg'>
      <div className='container mx-auto px-4 py-2 flex items-center justify-between'>
        <Link to='/dashboard'>
          <img
            src='/1.png'
            className='w-12 h-10'
            alt='Logo'
          />
        </Link>

        <button
          className='lg:hidden text-dark-green focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          className={`flex-col lg:flex lg:flex-row ${
            isOpen ? 'flex' : 'hidden'
          }`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`text-dark-green hover:text-green-600 transition-colors duration-300 px-4 py-2 ${
                location.pathname === href ? 'font-semibold' : 'font-medium'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
