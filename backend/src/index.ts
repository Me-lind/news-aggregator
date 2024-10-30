import express from 'express';
import dotenv from 'dotenv';
import newsRoutes from './routes/newsRoutes';
import authRoutes from './routes/authRoutes'
import subscriptionRoutes from './routes/subscriptionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', subscriptionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
