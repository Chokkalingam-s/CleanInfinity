import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthComponent from './AuthComp'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Temp from './temp'

export default function Layout() {
  return (
    <Router>
      <div className='min-h-screen relative top-6 bg-lightest-green'>
        <Navbar />
        <main className='p-6'>
          <Routes>
            <Route
              path='/dashboard'
              element={<Dashboard />}
            />
            <Route
              path='/awareness'
              element={<Temp />}
            />
            <Route
              path='/progress'
              element={<Temp />}
            />
            <Route
              path='/nfc'
              element={<Temp />}
            />
            <Route
              path='/profile'
              element={<Temp />}
            />
            <Route
              path='/'
              element={<AuthComponent />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
