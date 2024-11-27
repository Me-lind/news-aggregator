import pool from '../config/database';

export const getUniqueSubscribedTopics = async (): Promise<string[]> => {
    const result = await pool.query('SELECT DISTINCT topic FROM subscriptions');
    return result.rows.map(row => row.topic);
};

export const getSubscribersByTopic = async (topic: string) => {
  const query = `
      SELECT email
      FROM subscriptions
      INNER JOIN users ON subscriptions.user_id = users.id
      WHERE subscriptions.topic = $1
  `;
  const result = await pool.query(query, [topic]);
  return result.rows; 
};
