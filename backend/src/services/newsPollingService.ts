import { fetchNewsByTopic } from './newsService';
import { getUniqueSubscribedTopics } from './subscriptionService';
import { processArticlesForSentiment } from './batchAnalysis';
import { notifySubscribers } from './notifySubscribers';
import { Server } from 'socket.io';

const POLLING_INTERVAL = 20 * 60 * 1000; 
const latestTimestamps: { [topic: string]: string } = {};

export const startNewsPolling = (io: Server) => {
    setInterval(async () => {
        console.log('Polling for new news updates...');

        try {
            const topics = await getUniqueSubscribedTopics();

            for (const topic of topics) {
                const newsData = await fetchNewsByTopic(topic, latestTimestamps[topic]);

                if (newsData.articles.length > 0) {
                    console.log(`New articles found for topic: ${topic}`);

                    const processedArticles = processArticlesForSentiment(newsData.articles);

                    io.to(topic).emit('newsUpdate', processedArticles);

                    const trendingArticles = processedArticles.filter(
                        article => article.score >= 0.6 
                    );

                    if (trendingArticles.length > 0) {
                        console.log(`Trending articles identified for topic: ${topic}`);
                        await notifySubscribers(topic, trendingArticles);
                    }

                    latestTimestamps[topic] = newsData.articles[0].publishedAt;
                }
            }
        } catch (error) {
            console.error('Error polling news:', error);
        }
    }, POLLING_INTERVAL);
};
