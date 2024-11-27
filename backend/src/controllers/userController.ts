import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        res.status(400).json({ message: 'Email, Username and password are required.' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id',
            [email, hashedPassword, username]
        );

        const userId = result.rows[0].id;
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        if ((error as any).code === '23505') {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            res.status(400).json({ message: 'Invalid email or password.' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).json({ message: 'Invalid email or password.' });
            return;
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token: token,
            username: user.username, 
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
