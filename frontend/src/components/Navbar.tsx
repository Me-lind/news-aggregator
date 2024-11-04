import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="w-64 h-screen bg-black text-white fixed flex flex-col p-4">
            <h2 className="text-xl font-semibold mb-8">My News App</h2>
            <Link to="/dashboard" className="mb-4 hover:text-gray-400">
                Dashboard
            </Link>
            <Link to="/trending" className="mb-4 hover:text-gray-400">
                Trending
            </Link>
            <Link to="/subscriptions" className="mb-4 hover:text-gray-400">
                Subscriptions
            </Link>
            <Link to="/profile" className="hover:text-gray-400">
                Profile
            </Link>
        </nav>
    );
};

export default Navbar;
