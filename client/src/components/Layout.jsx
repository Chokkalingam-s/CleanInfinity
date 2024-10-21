import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthComponent from './AuthComp'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Awareness from './Awareness'
import Progress from './Progress'

export default function Layout() {
  const data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 75]
  const credits = 500
  return (
    <Router>
      <div className='min-h-screen relative top-6 bg-lightest-green'>
        <Navbar />
        <main className='p-6'>
          <Routes>
            <Route
              path='/dashboard'
              element={
                <Dashboard
                  BarGraphVals={data}
                  creditVal={credits}
                />
              }
            />
            <Route
              path='/awareness'
              element={<Awareness />}
            />
            <Route
              path='/progress'
              element={<Progress />}
            />
            <Route
              path='/nfc'
              element={<Progress />}
            />
            <Route
              path='/profile'
              element={<Progress />}
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
