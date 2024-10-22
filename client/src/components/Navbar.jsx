import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation() // Get the current location
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/awareness', label: 'Awareness' },
    { href: '/progress', label: 'Progress' },
    { href: '/nfc', label: 'NFC Pairing' },
    { href: '/profile', label: 'Profile' },
    { href: '/', label: 'Log out' },
  ]

  return (
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
    </header>
  )
}
