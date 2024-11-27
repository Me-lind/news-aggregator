import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { email, password });

            const data = response.data;
            localStorage.setItem('token', data.token);

            localStorage.setItem('username', data.username);

            localStorage.setItem('tokenTimestamp', Date.now().toString());
            setIsLoggedIn(true);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error', error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                <label className="block mb-4">
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                    />
                </label>
                <label className="block mb-6">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>

                <div className="flex flex-col items-center mt-4 space-y-2">
                    <p className="text-gray-600">Don't Have an Account?</p>
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                    <div className="flex space-x-4">
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;


