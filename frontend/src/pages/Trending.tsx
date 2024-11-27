import React, { useState, useEffect } from 'react';
import api from '../services/api';
import NewsCard from '../components/NewsCard';
import { NewsItem } from '../types/NewsItem';
import { toast } from 'react-toastify';

const Trending: React.FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchTrendingNews = async () => {
            try {
                const response = await api.get('/api/news/trending'); 
                setNewsData(response.data.articles); 
            } catch (error) {
                console.error('Failed to fetch trending news', error)
                toast.error('Failed to fetch trending news')

            }
        };

        fetchTrendingNews();
    }, []);

    return (
        <div className="home">
            <h1>Trending News</h1>
            <div className="news-list">
                {newsData.map((news, index) => (
                    <NewsCard
                        key={index}
                        title={news.title}
                        description={news.description}
                        url={news.url}
                        urlToImage={news.urlToImage}
                        publishedAt={news.publishedAt}
                    />
                ))}
            </div>
        </div>
    );
};

export default Trending;
