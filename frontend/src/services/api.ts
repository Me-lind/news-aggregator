// src/services/api.ts
import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: 'http://localhost:4000',
});

// Intercept requests to add the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
