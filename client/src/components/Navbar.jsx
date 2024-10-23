import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user }) {
  const location = useLocation(); // Get the current location
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/awareness', label: 'Awareness' },
    { href: '/progress', label: 'Progress' },
    { href: '/nfc', label: 'NFC Pairing' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="fixed top-0 w-full bg-black z-10 shadow-lg">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/dashboard">
          <img src="/1.png" className="w-12 h-10" alt="Logo" />
        </Link>
        <nav className="flex gap-4 items-center">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`text-green-500 hover:text-green-600 transition-colors duration-300 ${
                location.pathname === href ? 'font-semibold' : 'font-medium'
              }`}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <div className="text-green-500 font-semibold">{user.name}</div> // Show user name
          ) : (
            <Link
              to="/"
              className={`text-green-500 hover:text-green-600 transition-colors duration-300 ${
                location.pathname === '/' ? 'font-semibold' : 'font-medium'
              }`}
            >
              Log out
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
