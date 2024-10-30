import pool from '../config/database';

// Get all unique topics from subscriptions
export const getUniqueSubscribedTopics = async (): Promise<string[]> => {
    const result = await pool.query('SELECT DISTINCT topic FROM subscriptions');
    return result.rows.map(row => row.topic);
};
