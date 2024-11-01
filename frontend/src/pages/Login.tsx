// src/pages/Login.tsx
import React, { useState } from 'react';
import api from '../services/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store token in local storage
            alert('Login successful!');
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
