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
import NFCPage from './NFC'

function LayoutContent({ data, credits }) {
  const location = useLocation()
  const states = ['State 1', 'State 2']
  const districts = ['District 1', 'District 2']
  const wards = ['Ward 1', 'Ward 2']

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
            element={<NFCPage />}
          />
          <Route
            path='/profile'
            element={<Progress />}
          />
          <Route
            path='/'
            element={
              <AuthComponent
                districts={districts}
                states={states}
                wards={wards}
              />
            }
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
