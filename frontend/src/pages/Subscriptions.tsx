import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SubscriptionCard from '../components/SubscriptionCard';

const Subscriptions: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await api.get('/api/subscriptions');
                setSubscriptions(response.data.subscriptions);
            } catch (error) {
                console.error('Failed to fetch subscriptions', error);
            }
        };

        fetchSubscriptions();
    }, []);

    const handleUnsubscribe = (topic: string) => {
        setSubscriptions(subscriptions.filter(sub => sub !== topic));
    };

    return (
        <div className="subscriptions">
            <h1>Your Subscriptions</h1>
            <div className="subscription-list">
                {subscriptions.map((topic, index) => (
                    <SubscriptionCard key={index} topic={topic} onUnsubscribe={handleUnsubscribe} />
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
