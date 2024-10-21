import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import AuthComponent from './AuthComp'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Awareness from './Awareness'
import Progress from './Progress'

function LayoutContent({ data, credits, setIsSignUp }) {
  const location = useLocation()

  return (
    <div
      className={`min-h-screen relative ${
        location.pathname === '/' ? 'pt-0' : 'pt-12'
      } bg-lightest-green`}
    >
      {location.pathname !== '/' && <Navbar />}
      <main>
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
            element={<AuthComponent setSignUp={setIsSignUp} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default function Layout() {
  const data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 80]
  const credits = 500

  return (
    <Router>
      <LayoutContent
        data={data}
        credits={credits}
      />
    </Router>
  )
}
