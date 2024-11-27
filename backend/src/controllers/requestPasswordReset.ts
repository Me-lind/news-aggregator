import { Request, Response } from 'express';
import crypto from "crypto";
import pool from "../config/database";
import { transporter } from '../config/nodemailerConfig';

export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "Email is required." });
        return;
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 3600 * 1000);

        await pool.query(
            "UPDATE users SET password_reset_token = $1, token_expiry = $2 WHERE email = $3",
            [token, expiry, email]
        );


        const resetLink = `http://localhost:5173/reset-password/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}`,
        });

        res.status(200).json({ message: "Password reset link sent to email." });
    } catch (error) {
        console.error("Error requesting password reset:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
