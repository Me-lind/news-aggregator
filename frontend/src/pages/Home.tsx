// src/pages/Home.tsx
import React from 'react';
import NewsCard from '../components/NewsCard';

const Home: React.FC = () => {
    // Dummy data for now
    const newsData = [
        { title: 'Market Rallies Amidst Economic Uncertainty', sentiment: 'positive' },
        { title: 'Tech Stocks Down After New Regulations', sentiment: 'negative' },
        // Add more dummy articles here
    ];

    return (
        <div className="home">
            <h1>Trending News</h1>
            <div className="news-list">
                {newsData.map((news, index) => (
                    <NewsCard key={index} title={news.title} sentiment={news.sentiment} />
                ))}
            </div>
        </div>
    );
};

export default Home;
