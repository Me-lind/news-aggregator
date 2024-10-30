import { Request, Response } from 'express';
import pool from '../config/database';

// Add a subscription to a specific topic for a user
export const addSubscription = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId; 
    const { topic } = req.body;

    if (!topic) {
        res.status(400).json({ message: 'Topic is required.' });
        return;
    }

    try {
        // Insert new subscription
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

// Remove a subscription from a specific topic for a user
export const removeSubscription = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId;
    const { topic } = req.body;

    if (!topic) {
        res.status(400).json({ message: 'Topic is required.' });
        return;
    }

    try {
        // Delete the subscription
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

// Get all subscriptions for the authenticated user
export const getSubscriptions = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).user.userId;

    try {
        // Fetch all subscriptions for the user
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
