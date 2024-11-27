import React from 'react';
import api from '../services/api';
import { SubscriptionCardProps } from '../props/SubscriptionCard';


const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ topic, onUnsubscribe }) => {
    const handleUnsubscribe = async () => {
        try {
            await api.delete('/api/unsubscribe', { data: { topic } });
            onUnsubscribe(topic); 
        } catch (error) {
            console.error('Unsubscription error', error);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md flex justify-between items-center">
            <h2 className="text-lg font-semibold">{topic}</h2>
            <button
                onClick={handleUnsubscribe}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
            >
                Unsubscribe
            </button>
        </div>
    );
};

export default SubscriptionCard;
