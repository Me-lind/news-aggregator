import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/">Dashboard</Link> {/* Main Dashboard */}
            <Link to="/home">Trending</Link>   {/* Trending News */}
            <Link to="/subscriptions">Subscriptions</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
};

export default Navbar;
