import { Request, Response } from 'express';
import pool from '../config/database';

export const addSubscription = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId; 
    const { topic } = req.body;

    if (!topic) {
        res.status(400).json({ message: 'Topic is required.' });
        return;
    }

    try {
        await pool.query(
            'INSERT INTO subscriptions (user_id, topic) VALUES ($1, $2)',
            [userId, topic]
        );
        res.status(201).json({ message: `Subscribed to topic: ${topic}` });
    } catch (error) {
        console.error('Error adding subscription:', error);
        res.status(500).json({ message: 'Failed to add subscription' });
    }
};

export const removeSubscription = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId;
    const { topic } = req.body;

    if (!topic) {
        res.status(400).json({ message: 'Topic is required.' });
        return;
    }

    try {
        const result = await pool.query(
            'DELETE FROM subscriptions WHERE user_id = $1 AND topic = $2',
            [userId, topic]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ message: `No subscription found for topic: ${topic}` });
        } else {
            res.status(200).json({ message: `Unsubscribed from topic: ${topic}` });
        }
    } catch (error) {
        console.error('Error removing subscription:', error);
        res.status(500).json({ message: 'Failed to remove subscription' });
    }
};

export const getSubscriptions = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId;

    try {
        const result = await pool.query(
            'SELECT topic FROM subscriptions WHERE user_id = $1',
            [userId]
        );
        const topics = result.rows.map(row => row.topic);
        res.status(200).json({ subscriptions: topics });
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Failed to retrieve subscriptions' });
    }
};
