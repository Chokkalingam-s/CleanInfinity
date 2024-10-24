import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import AuthComponent from './AuthComp';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import Awareness from './Awareness';
import Progress from './Progress';
import NFCPage from './NFC';
import Profile from './Profile'; // Import the Profile component
import states from '../data/stateAndDistrict.json';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'; // Import useState for managing theme state
import ThemeToggle from './ThemeToggle'; // Import your theme toggle button

function LayoutContent({ data, credits, isDarkMode, toggleTheme }) {
  const location = useLocation();
  const districts = ['District 1', 'District 2'];
  const wards = ['Ward 1', 'Ward 2'];

  return (
    <div
      className={`min-h-screen relative ${
        location.pathname === '/' ? 'pt-0' : 'pt-12'
      } ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`} // Set grey for light mode and black for dark mode
    >
      <ToastContainer />
      {location.pathname !== '/' && <Navbar />}
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> {/* Include the toggle button */}
      <main>
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard BarGraphVals={data} creditVal={credits} />}
          />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/nfc" element={<NFCPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/home' element={<Home />} />
          <Route
            path="/"
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
  );
}

export default function Layout() {
  const data = [70, 50, 90, 30, 100, 45, 80, 60, 25, 85, 55, 80];
  const credits = 500;
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage theme

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle between light and dark mode
  };

  return (
    <Router>
      <LayoutContent data={data} credits={credits} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </Router>
  );
}
