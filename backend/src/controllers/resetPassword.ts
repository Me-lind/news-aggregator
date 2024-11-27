import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';


export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        res.status(400).json({ message: "Token and new password are required." });
        return;
    }

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE password_reset_token = $1 AND token_expiry > NOW()",
            [token]
        );
        const user = result.rows[0];

        if (!user) {
            res.status(400).json({ message: "Invalid or expired token." });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            "UPDATE users SET password = $1, password_reset_token = NULL, token_expiry = NULL WHERE id = $2",
            [hashedPassword, user.id]
        );

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
