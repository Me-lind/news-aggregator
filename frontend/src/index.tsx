// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Optional: import global CSS if you have it

// Find the root element in index.html where the app will be rendered
const rootElement = document.getElementById('root') as HTMLElement;

// Create a root and render the App component
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
