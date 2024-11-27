import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../validations/emailValidation';
import { validatePassword } from '../validations/passwordValidation';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('')
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!validateEmail(email)){
            return toast.error("Please enter valid email from a supported email")
        }
        if (!validatePassword(password)) {
            return toast.error(
                "Password must be at least 8 characters long and include uppercase letters, lowercase letters, a number, and a special character."
            );
        }

        try {
            await api.post('/api/auth/register', { email, password, username });
            toast.success('Registration successful🎉😁! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000); 
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
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
                    />
                </label>
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
