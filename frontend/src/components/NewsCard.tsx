import React from 'react';

interface NewsCardProps {
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, url, urlToImage, publishedAt }) => {
    return (
        <div className="news-card">
            {urlToImage && <img src={urlToImage} alt={title} className="news-image" />}
            <h2>{title}</h2>
            <p>{description}</p>
            <p><strong>Published:</strong> {new Date(publishedAt).toLocaleDateString()}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
                Read more
            </a>
        </div>
    );
};

export default NewsCard;
