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

function LayoutContent() {
  const location = useLocation()
  const dashboard_data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 80]
  const dashboard_credits = 500
  const auth_districts = ['District 1', 'District 2']
  const auth_wards = ['Choose Your Ward', 'Ward 1', 'Ward 2']
  const dashboard_titles = [
    'Knowledge',
    'Progress',
    'Pair Dustbin',
    'Notify',
    'PingMe',
    'Activity',
  ]
  const awareness_video_link =
    'https://www.youtube.com/embed/DHfRfU3XUEo?si=2Tw6Xk_Xs3Ihwak3'
  const progress_data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 75]
  const progress_users = [
    { name: 'User 1', value: 66 },
    { name: 'User 2', value: 90 },
    { name: 'User 3', value: 45 },
  ]
  const progress_BarStyles = {
    root: {
      width: '120px',
      height: '120px',
    },
    path: {
      stroke: '#4CAF50',
    },
    text: {
      fill: '#4CAF50',
      fontSize: '1rem',
    },
  }

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
