// src/pages/Register.tsx
import React, { useState } from 'react';
import api from '../services/api';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/register', { email, password });
            response
            alert('Registration successful!');
        } catch (error) {
            console.error('Registration error', error);
            alert('Failed to register. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
