import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const ResetPassword: React.FC = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/api/forgot-password/reset-password", { token, newPassword });
            toast.success("Password reset successfully.");
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("Failed to reset password.");
        }
    };

    return (
        <form onSubmit={handleReset}>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword