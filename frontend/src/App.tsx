import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Trending from './pages/Trending';
import Subscriptions from './pages/Subscriptions';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const TOKEN_EXPIRATION_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds

const App: React.FC = () => {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Logout function to clear token and state
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    setIsLoggedIn(false);
  };

  // Check token expiration every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      if (tokenTimestamp && Date.now() - parseInt(tokenTimestamp) > TOKEN_EXPIRATION_TIME) {
        handleLogout(); // Logout if token is expired
      }
    }, 60000); 

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100"> {/* Full-height flex container */}
        {isLoggedIn && <Navbar />}
        <div className="flex-grow p-8 lg:ml-64 bg-white text-gray-900"> {/* Content area */}
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/subscriptions" element={isLoggedIn ? <Subscriptions /> : <Navigate to="/" />} />
            <Route path="/trending" element={isLoggedIn ? <Trending /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
