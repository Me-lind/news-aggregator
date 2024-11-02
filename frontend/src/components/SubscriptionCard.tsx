import React from 'react';
import api from '../services/api';

interface SubscriptionCardProps {
    topic: string;
    onUnsubscribe: (topic: string) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ topic, onUnsubscribe }) => {
    const handleUnsubscribe = async () => {
        try {
            await api.post('/api/unsubscribe', { topic });
            onUnsubscribe(topic); 
        } catch (error) {
            console.error('Unsubscription error', error);
        }
    };

    return (
        <div className="subscription-card">
            <h2>{topic}</h2>
            <button onClick={handleUnsubscribe}>Unsubscribe</button>
        </div>
    );
};

export default SubscriptionCard;
