import React from 'react';
import { Link } from 'react-router-dom';
import { NavbarProps } from '../props/Navbar';
import { TiChartLine } from "react-icons/ti";
import { TiThSmall } from "react-icons/ti";
import { TiUser } from "react-icons/ti";
import { TiPower } from "react-icons/ti";

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
    return (
        <nav className="w-64 h-screen bg-black text-white fixed flex flex-col p-4">
            <h2 className="text-xl font-semibold mb-8">NewsHub</h2>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                    <TiThSmall className="mr-2" />
                    <Link to="/dashboard" className="hover:text-gray-400">
                        Dashboard
                    </Link>
                </div>
                <div className="flex items-center">
                    <TiChartLine className="mr-2" />
                    <Link to="/trending" className="hover:text-gray-400">
                        Trending
                    </Link>
                </div>
                <div className="flex items-center">
                    <TiUser className="mr-2" />
                    <Link to="/profile" className="hover:text-gray-400">
                        Profile
                    </Link>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="mt-auto bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center">
                <TiPower className="mr-2" />
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
