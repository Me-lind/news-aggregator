import axios from 'axios';


const NEWS_API_KEY = process.env.NEWS_API_KEY as string;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsByTopic = async (topic: string, from?: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: {
                q: topic,
                from: from, // Only fetch articles published after this date
                apiKey: NEWS_API_KEY,
                sortBy: 'publishedAt',
            },
            headers: {
                'X-Api-Key': NEWS_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw new Error('Failed to fetch news');
    }
};

// console.log("API Key:", process.env.NEWS_API_KEY);
// API Key: undefined
