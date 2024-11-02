import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Trending from './pages/Trending';
import Subscriptions from './pages/Subscriptions';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/home" element={<Trending />} /> 
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
