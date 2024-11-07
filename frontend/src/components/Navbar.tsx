import React from 'react';
import { Link } from 'react-router-dom';
// adding logout to the navbar
interface NavbarProps {
    handleLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ( {handleLogout} ) => {
    return (
        <nav className="w-64 h-screen bg-black text-white fixed flex flex-col p-4">
            <h2 className="text-xl font-semibold mb-8">My News App</h2>
            <Link to="/dashboard" className="mb-4 hover:text-gray-400">
                Dashboard
            </Link>
            <Link to="/trending" className="mb-4 hover:text-gray-400">
                Trending
            </Link>
            <Link to="/profile" className="hover:text-gray-400">
                Profile
            </Link>
            <button
                onClick={handleLogout}
                className="mt-auto bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"

            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
