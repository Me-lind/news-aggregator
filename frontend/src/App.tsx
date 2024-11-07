import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Trending from './pages/Trending';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

const TOKEN_EXPIRATION_TIME = 20 * 60 * 1000; 

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      if (tokenTimestamp && Date.now() - parseInt(tokenTimestamp) > TOKEN_EXPIRATION_TIME) {
        handleLogout(); 
      }
    }, 60000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <Router>
      <div className={`app flex ${isLoggedIn ? 'bg-white' : 'bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen'}`}>
      {isLoggedIn && <Navbar handleLogout={handleLogout} />}
      <div className={`${isLoggedIn ? 'flex-grow p-8 lg:ml-64 bg-gray-100' : 'flex-grow flex items-center justify-center'}`}>
      <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/trending" element={isLoggedIn ? <Trending /> : <Navigate to="/" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
