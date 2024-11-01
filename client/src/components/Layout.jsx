import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import AuthComponent from './AuthComp'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Awareness from './Awareness'
import Progress from './Progress'
import NFCPage from './NFC'
import Profile from './Profile'
import auth_states from '../data/stateAndDistrict.json'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NFCCard from './NFC-Card'
import {
  dashboard_data,
  dashboard_credits,
  auth_wards,
  dashboard_titles,
  awareness_video_link,
  progress_data,
  progress_users,
  progress_BarStyles,
  article_data,
  awareness_cardsData,
  activity_posts
} from '../data/config'
import SplashScreen from './Splash'
import {useEffect, useState} from 'react'
import Notify from './Notify'
import PingMe from './PingMe'
import Activity from './Activity'

function LayoutContent() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className={'min-h-screen w-screen'}>
      <div
        className='fixed top-0 w-full h-full -z-10'
        style={{
          backgroundImage: 'url(/0ba822008116c4db07f85b772a5dcea9-Photoroom.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          filter: 'invert(1) sepia(1) hue-rotate(75deg) saturate(3) brightness(0.4)',
          opacity: 0.1
        }}
      />
      <ToastContainer />
      {location.pathname !== '/' && <Navbar />}
      <main>
        <Routes>
          <Route
            path='/dashboard'
            element={
              <Dashboard BarGraphVals={dashboard_data} creditVal={dashboard_credits} titles={dashboard_titles} />
            }
          />
          <Route
            path='/awareness'
            element={<Awareness src={awareness_video_link} data={article_data} cardsData={awareness_cardsData} />}
          />
          <Route
            path='/progress'
            element={<Progress data={progress_data} users={progress_users} progressBarStyles={progress_BarStyles} />}
          />
          <Route path='/nfc' element={<NFCPage />} />
          <Route path='/nfc-card' element={<NFCCard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/notify' element={<Notify />} />
          <Route path='/activity' element={<Activity posts={activity_posts} />} />
          <Route path='/ping-me' element={<PingMe />} />
          <Route
            path='/'
            element={loading ? <SplashScreen /> : <AuthComponent states={auth_states} wards={auth_wards} />}
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
