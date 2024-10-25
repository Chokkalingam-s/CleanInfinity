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
    <header className='fixed top-0 w-full z-10 shadow-lg rounded-lg bg-medium-green h-12'>
      <div className='flex items-center justify-between'>
        <div
          style={{ backgroundImage: 'url(/1.png)' }}
          className='w-24 h-12 bg-cover bg-center ml-2'
        ></div>
        <button
          className='lg:hidden md:hidden focus:outline-none bg-transparent w-12'
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={isOpen ? './xmark-solid.svg' : './bars-solid.svg'} />
        </button>
        <nav
          className={`flex-col absolute right-0 top-10 shadow-lg ${
            isOpen ? 'flex' : 'hidden'
          } md:flex-row lg:flex-row md:flex lg:flex md:relative md:top-0 lg:relative lg:top-0 md:shadow-none lg:shadow-none`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`hover:text-light-green transition-colors duration-100 px-4 py-2 ${
                location.pathname === href
                  ? 'text-light-green'
                  : 'text-lightest-green'
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
