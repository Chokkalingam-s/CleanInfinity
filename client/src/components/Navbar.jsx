export default function Navbar() {
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/awareness', label: 'Awareness' },
    { href: '/progress', label: 'Progress' },
    { href: '/nfc', label: 'NFC Pairing' },
    { href: '/profile', label: 'Profile' },
  ]

  return (
    <header className='h-10 flex items-center fixed w-full justify-between px-2'>
      <img
        src='/1.png'
        className='w-1/12 h-10 bg-white'
      />
      <nav className='flex gap-2 menu'>
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={label === 'Dashboard' ? 'activeLink' : ''}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
