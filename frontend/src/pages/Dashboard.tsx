import React, { useState, useEffect } from 'react';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import { NewsItem } from '../types/NewsItem';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const topics = ['general','politics','business', 'finance', 'entertainment', 'technology', 'sports', 'forex'];

const Dashboard: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState('general');
    const [news, setNews] = useState<NewsItem[]>([]);
    const [subscribedTopics, setSubscribedTopics] = useState<string[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get(`/api/news/${selectedTopic}`); 
                setNews(response.data.articles);
            } catch (error) {
                console.error('Failed to fetch news', error);
            }
        };

        fetchNews();
    }, [selectedTopic]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await api.get('/api/subscriptions');
                setSubscribedTopics(response.data.subscriptions);
            } catch (error) {
                console.error('Failed to fetch subscriptions', error);
            }
        };

        fetchSubscriptions();
    }, []);

    const handleSubscribe = async ():Promise<void> => {
        try {
            await api.post('/api/subscribe', { topic: selectedTopic });
            setSubscribedTopics([...subscribedTopics, selectedTopic]);
            toast.success(`Subscribed to ${selectedTopic}`);
        } catch (error) {
            console.error('Subscription error', error);
            toast.error('Failed to subscribe.');
        }
    };

    const handleUnsubscribe = async () => {
        try {
            await api.delete(`/api/unsubscribe`, { data: { topic: selectedTopic } }); // Pass topic as a URL parameter
            setSubscribedTopics(subscribedTopics.filter(topic => topic !== selectedTopic));
            toast.success(`Unsubscribed from ${selectedTopic}`);
        } catch (error) {
            console.error('Unsubscription error', error);
            toast.error('Failed to unsubscribe.');
        }
    };

    return (
        <div className="px-4 py-8 lg:px-8">
            <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {topics.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                            selectedTopic === topic
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}                    >
                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </button>
                ))}
            </div>

            <div className="text-center mb-8">
                {subscribedTopics.includes(selectedTopic) ? (
                    <button
                        onClick={handleUnsubscribe}
                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        Unsubscribe from {selectedTopic}
                    </button>
                ) : (
                    <button
                        onClick={handleSubscribe}
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                        Subscribe to {selectedTopic}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <NewsCard
                        key={index}
                        title={item.title}
                        description={item.description || 'No description available'}
                        url={item.url}
                        urlToImage={item.urlToImage || ''}
                        publishedAt={item.publishedAt}
                    />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
