import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SubscriptionCard from '../components/SubscriptionCard';
import { toast } from 'react-toastify';

interface ProfileProps{
    handleLogout:()=>void
}
const Profile: React.FC <ProfileProps>= ({handleLogout}) => {
    const [userDetails, setUserDetails] = useState<{ email: string, username: string } | null>(null);
    const [subscriptions, setSubscriptions] = useState<string[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userResponse = await api.get('/user-details/user');
                setUserDetails(userResponse.data);

                const subscriptionResponse = await api.get('/api/subscriptions');
                console.log(subscriptionResponse.data);
                setSubscriptions(subscriptionResponse.data.subscriptions || []);
            } catch (error) {
                console.error('Failed to fetch profile data', error)
                toast.error('Failed to fetch profile data')

            }
        };

        fetchProfileData();
    }, []);

    const handleUnsubscribe = (topic: string) => {
        setSubscriptions(subscriptions.filter(sub => sub !== topic));
    };
    const handleDeleteAccount = async () => {
        try {
            await api.delete("/api/auth/delete-user");
            toast.success("Your account has been deleted")
            handleLogout()
        }
        catch (error) {
            console.error("Failed to Delete User:", error);
            toast.error("Unable to delete account.Please try again later.")
        }
    }

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            {userDetails && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">User Details</h2>
                    <p><strong>UserName: </strong>{userDetails.username}</p>
                    <p><strong>Email: </strong> {userDetails.email}</p>
                </div>
            )}

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
            <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
                Delete Account
            </button>
            {showConfirm && (
                <div className="modal bg-gray-700 bg-opacity-50 fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <button
                            onClick={handleDeleteAccount}
                            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Yes, delete my account
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
