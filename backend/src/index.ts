import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import newsRoutes from './routes/newsRoutes';
import authRoutes from './routes/authRoutes'
import subscriptionRoutes from './routes/subscriptionRoutes';
import { startNewsPolling } from './services/newsPollingService';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', subscriptionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

startNewsPolling(io); 

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('subscribeToTopic', (topic) => {
        console.log(`User subscribed to topic: ${topic}`);
        socket.join(topic); // Join the user to a topic-specific room
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});