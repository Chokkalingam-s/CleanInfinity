import Dashboard from './Dashboard'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className='min-h-screen bg-lightest-green'>
      <Navbar />
      <Dashboard />
    </div>
  )
}
