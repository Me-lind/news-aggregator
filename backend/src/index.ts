import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';  // Import CORS middleware
import newsRoutes from './routes/newsRoutes';
import authRoutes from './routes/authRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import { startNewsPolling } from './services/newsPollingService';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure CORS for Express
app.use(cors({
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "DELETE"]
}));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE"]
    }
});

const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is running 🎉😁');
});

// Set up routes
app.use('/api', newsRoutes);
app.use('/user-details', userRoutes)
app.use('/api/auth', authRoutes);
app.use('/api', subscriptionRoutes);

// Start news polling
startNewsPolling(io);

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('subscribeToTopic', (topic) => {
        console.log(`User subscribed to topic: ${topic}`);
        socket.join(topic);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the Express server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
