// src/pages/Subscriptions.tsx
import React from 'react';
import SubscriptionCard from '../components/SubscriptionCard';

const Subscriptions: React.FC = () => {
    // Dummy data for now
    const subscriptions = ['Technology', 'Healthcare', 'Forex'];

    return (
        <div className="subscriptions">
            <h1>Your Subscriptions</h1>
            <div className="subscription-list">
                {subscriptions.map((topic, index) => (
                    <SubscriptionCard key={index} topic={topic} />
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
