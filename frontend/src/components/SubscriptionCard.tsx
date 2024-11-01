// src/components/SubscriptionCard.tsx
import React from 'react';

interface SubscriptionCardProps {
    topic: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ topic }) => {
    return (
        <div className="subscription-card">
            <h2>{topic}</h2>
            <button>Unsubscribe</button>
        </div>
    );
};

export default SubscriptionCard;
