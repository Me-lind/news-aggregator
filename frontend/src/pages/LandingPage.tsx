import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            {/* Get Started */}
            <div className="hero flex flex-col items-center justify-center text-center px-6 py-20">
            <h1 className="text-5xl font-bold mb-4">Welcome to NewsHub</h1>
            <p className="text-lg mb-8">
                    Stay updated with the latest trending news and manage your subscriptions in one place.
                </p>
                <div className="space-x-4">
                    <Link to="/register" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100">
                        Get Started
                    </Link>
                    <Link to="/login" className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600">
                        Login
                    </Link>
                </div>
            </div>
            {/* About */}
            <div className="about px-6 py-12 bg-white text-gray-800 text-center">
                <h2 className="text-3xl font-bold mb-4">Why Choose NewsHub?</h2>
                <p className="text-lg mb-8">
                    NewsHub brings all your favorite news sources together, tailored to your interests. Stay informed and
                    never miss a beat with trending articles delivered directly to you.
                </p>
                <div className="features grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature p-6 bg-gray-100 rounded shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Real-Time News</h3>
                        <p>Get the latest news updates as they happen, filtered by your favorite topics.</p>
                    </div>
                    <div className="feature p-6 bg-gray-100 rounded shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Custom Subscriptions</h3>
                        <p>Subscribe to topics that matter most to you and stay ahead of the curve.</p>
                    </div>
                    <div className="feature p-6 bg-gray-100 rounded shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Trending Insights</h3>
                        <p>Explore trending stories and sentiment analysis to understand market reactions.</p>
                    </div>
                </div>
            </div>
            {/* Sign up */}
            <div className="cta py-12 bg-blue-700 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
                <p className="text-lg mb-8">
                    Join thousands of users staying informed with NewsHub. Sign up today and start exploring.
                </p>
                <Link to="/register" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-md hover:bg-gray-100">
                    Get Started Now
                </Link>
            </div>

        </div>
    )
}

export default LandingPage