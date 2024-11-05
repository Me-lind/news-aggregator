import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SubscriptionCard from '../components/SubscriptionCard';

const Profile: React.FC = () => {
    const [userDetails, setUserDetails] = useState<{ email: string } | null>(null);
    const [subscriptions, setSubscriptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userResponse = await api.get('/user-details/user');
                setUserDetails(userResponse.data);

                const subscriptionResponse = await api.get('/api/subscriptions');
                console.log(subscriptionResponse.data); 
                setSubscriptions(subscriptionResponse.data.subscriptions || []);
            } catch (error) {
                console.error('Failed to fetch profile data', error);
            }
        };

        fetchProfileData();
    }, []);

    const handleUnsubscribe = (topic: string) => {
        setSubscriptions(subscriptions.filter(sub => sub !== topic));
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            {/* User Details Section */}
            {userDetails && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">User Details</h2>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                </div>
            )}

            {/* Subscriptions Section */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Your Subscriptions</h2>
                {subscriptions.length > 0 ? (
                    <div className="grid gap-4">
                        {subscriptions.map((topic) => (
                            <SubscriptionCard 
                                key={topic} 
                                topic={topic} 
                                onUnsubscribe={handleUnsubscribe} 
                            />
                        ))}
                    </div>
                ) : (
                    <p>No subscriptions available</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
