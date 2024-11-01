// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import { NewsItem } from '../types/NewsItem';

const topics = ['business', 'finance', 'technology', 'sports', 'forex'];

const Dashboard: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState('business');
    const [news, setNews] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get(`/api/news/${selectedTopic}`);
                setNews(response.data);
            } catch (error) {
                console.error('Failed to fetch news', error);
            }
        };

        fetchNews();
    }, [selectedTopic]); // Refetch when the topic changes

    const handleSubscribe = async () => {
        try {
            await api.post('/subscribe', { topic: selectedTopic });
            alert(`Subscribed to ${selectedTopic}`);
        } catch (error) {
            console.error('Subscription error', error);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            await api.post('/unsubscribe', { topic: selectedTopic });
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
            <div className="news-list">
                {news.map((item, index) => (
                    <NewsCard key={index} title={item.title} sentiment={item.sentiment} />
                ))}
            </div>
            <div className="subscription-controls">
                <button onClick={handleSubscribe}>Subscribe to {selectedTopic}</button>
                <button onClick={handleUnsubscribe}>Unsubscribe from {selectedTopic}</button>
            </div>

        </div>
    );
};

export default Dashboard;
