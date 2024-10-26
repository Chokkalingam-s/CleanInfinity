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
import Profile from './Profile'
import auth_states from '../data/stateAndDistrict.json'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NFCCard from './NFC-Card'
import {
  dashboard_data,
  dashboard_credits,
  auth_districts,
  auth_wards,
  dashboard_titles,
  awareness_video_link,
  progress_data,
  progress_users,
  progress_BarStyles,
} from '../data/config'

function LayoutContent() {
  const location = useLocation()
  return (
    <div
      className={`min-h-screen relative ${
        location.pathname === '/' ? 'pt-0' : 'pt-12'
      }`}
    >
      <ToastContainer />
      {location.pathname !== '/' && <Navbar />}
      <main>
        <Routes>
          <Route
            path='/dashboard'
            element={
              <Dashboard
                BarGraphVals={dashboard_data}
                creditVal={dashboard_credits}
                titles={dashboard_titles}
              />
            }
          />
          <Route
            path='/awareness'
            element={<Awareness src={awareness_video_link} />}
          />
          <Route
            path='/progress'
            element={
              <Progress
                data={progress_data}
                users={progress_users}
                progressBarStyles={progress_BarStyles}
              />
            }
          />
          <Route
            path='/nfc'
            element={<NFCPage />}
          />
          <Route
            path='/nfc-card'
            element={<NFCCard />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/'
            element={
              <AuthComponent
                districts={auth_districts}
                states={auth_states}
                wards={auth_wards}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
export default function Layout() {
  return (
    <Router>
      <LayoutContent />
    </Router>
  )
}
