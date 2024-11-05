// src/pages/Register.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/api/auth/register', { email, password });
            toast.success('Registration successful🎉😁! Redirecting to login...');
            setTimeout(() => {
                navigate('/');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Registration error', error);
            toast.error('Failed to register😢. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-6">Register</h1>
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
                    Register
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
