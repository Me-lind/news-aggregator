import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/api/forgot-password/request-reset", { email });
            toast.success("Password reset link sent to your email.");
        } catch (error) {
            console.error("Error sending password reset link:", error);
            toast.error("Failed to send password reset link.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button type="submit">Request Password Reset</button>
        </form>
    );
};
export default ForgotPassword