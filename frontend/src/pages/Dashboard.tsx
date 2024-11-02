import React, { useState, useEffect } from 'react';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import { NewsItem } from '../types/NewsItem';

const topics = ['business', 'finance', 'technology', 'sports', 'forex'];

const Dashboard: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState('technology'); // Default topic
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

    const handleSubscribe = async () => {
        try {
            await api.post('/api/subscribe', { topic: selectedTopic });
            setSubscribedTopics([...subscribedTopics, selectedTopic]);
            alert(`Subscribed to ${selectedTopic}`);
        } catch (error) {
            console.error('Subscription error', error);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            await api.post('/api/unsubscribe', { topic: selectedTopic });
            setSubscribedTopics(subscribedTopics.filter(topic => topic !== selectedTopic));
            alert(`Unsubscribed from ${selectedTopic}`);
        } catch (error) {
            console.error('Unsubscription error', error);
        }
    };

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <div className="topic-buttons">
                {topics.map((topic) => (
                    <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={selectedTopic === topic ? 'active' : ''}
                    >
                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </button>
                ))}
            </div>

            <div className="subscription-controls">
                {subscribedTopics.includes(selectedTopic) ? (
                    <button onClick={handleUnsubscribe}>Unsubscribe from {selectedTopic}</button>
                ) : (
                    <button onClick={handleSubscribe}>Subscribe to {selectedTopic}</button>
                )}
            </div>

            <div className="news-list">
                {news.map((item, index) => (
                    <NewsCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        url={item.url}
                        urlToImage={item.urlToImage}
                        publishedAt={item.publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
