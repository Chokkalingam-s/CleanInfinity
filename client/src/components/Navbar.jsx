import { Link, useLocation } from 'react-router-dom'
<<<<<<< HEAD

export default function Navbar() {
  const location = useLocation() // Get the current location
=======
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
>>>>>>> 0b16e13df160191590e604409c4dd4aa6c00fce3
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/awareness', label: 'Awareness' },
    { href: '/progress', label: 'Progress' },
    { href: '/nfc', label: 'NFC Pairing' },
    { href: '/profile', label: 'Profile' },
    { href: '/', label: 'Log out' },
  ]
  return (
<<<<<<< HEAD
    <header className='h-10 flex items-center fixed w-full justify-between px-2 top-0 bg-light-green z-10 rounded-lg shadow-lg p-4'>
      <img
        src='/1.png'
        className='w-1/12 h-10 bg-white'
        alt='Logo'
      />
      <nav className='flex gap-2 menu'>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            to={href}
            className={
              location.pathname === href
                ? 'text-medium-green'
                : 'text-dark-green'
            }
          >
            {label}
          </Link>
        ))}
      </nav>
=======
    <header className='fixed top-0 w-full z-10 shadow-lg rounded-ee-lg rounded-es-lg bg-medium-green h-12'>
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
          className={`flex-col absolute right-0 top-12 rounded-lg ${
            isOpen ? 'flex' : 'hidden'
          } md:flex-row lg:flex-row md:flex lg:flex md:relative md:top-0 lg:relative lg:top-0 bg-medium-green md:bg-transparent lg:bg-transparent`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`hover:text-dark-green md:text-base lg:text-base transition-colors duration-200 px-4 py-2 ${
                location.pathname === href
                  ? 'text-dark-green text-lg'
                  : 'text-lightest-green'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
>>>>>>> 0b16e13df160191590e604409c4dd4aa6c00fce3
    </header>
  )
}
