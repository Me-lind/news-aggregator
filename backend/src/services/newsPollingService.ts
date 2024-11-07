import { fetchNewsByTopic } from './newsService';
import { getUniqueSubscribedTopics } from './subscriptionService';
import { Server } from 'socket.io';

const POLLING_INTERVAL = 10 * 60 * 1000; // Poll every 10 minutes
const latestTimestamps: { [topic: string]: string } = {}; // Store last fetched timestamp for each topic

export const startNewsPolling = (io: Server) => {
    setInterval(async () => {
        console.log('Polling for new news updates...');
        try {
            // Get all unique topics with active subscriptions
            const topics = await getUniqueSubscribedTopics();

            for (const topic of topics) {
                const newsData = await fetchNewsByTopic(topic);

                if (newsData.length > 0) {
                    io.to(topic).emit('newsUpdate', newsData);

                    latestTimestamps[topic] = newsData[0].publishedAt;
                }
            }
        } catch (error) {
            console.error('Error polling news:', error);
        }
    }, POLLING_INTERVAL);
};
