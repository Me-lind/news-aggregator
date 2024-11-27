import { Request, Response } from 'express';
import pool from '../config/database';

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId;

    try {
        const userResult = await pool.query('SELECT email,username FROM users WHERE id = $1', [userId]);
        const user = userResult.rows[0];

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json({
            email: user.email,
            username: user.username
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
