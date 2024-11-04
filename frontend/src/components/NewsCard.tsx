// src/components/NewsCard.tsx
import React from 'react';

interface NewsCardProps {
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, url, urlToImage, publishedAt }) => {
    return (
        <div className="bg-pink-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
            {urlToImage && <img src={urlToImage} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />}
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">{description || 'No description available'}</p>
            <p className="text-xs text-gray-400 mb-4">Published: {new Date(publishedAt).toLocaleDateString()}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Read more
            </a>
        </div>
    );
};

export default NewsCard;
