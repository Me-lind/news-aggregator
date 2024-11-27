import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

const NEWS_API_KEY = process.env.NEWS_API_KEY as string;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNewsByTopic = async (topic: string, from?: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/everything`, {
            headers: {
                'X-Api-Key': NEWS_API_KEY,
            },
            params: {
                q: topic,
                language:"en",
                from: from, 
                apiKey: NEWS_API_KEY,
                sortBy: 'publishedAt',
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
