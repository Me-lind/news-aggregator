// src/components/NewsCard.tsx
import React from 'react';

interface NewsCardProps {
    title: string;
    sentiment: 'positive' | 'neutral' | 'negative'| string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, sentiment }) => {
    return (
        <div className={`news-card ${sentiment}`}>
            <h2>{title}</h2>
            <p>Sentiment: {sentiment}</p>
        </div>
    );
};

export default NewsCard;
