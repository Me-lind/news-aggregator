import { Request, Response } from 'express';
import pool from '../config/database';

export const getUserDetails = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId; // assuming user ID is attached by the auth middleware

    try {
        // Fetch user email
        const userResult = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
        const user = userResult.rows[0];

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Respond with user email and subscriptions
        res.status(200).json({
            email: user.email,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
