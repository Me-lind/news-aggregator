import { Request, Response } from 'express';
import pool from '../config/database';

export const deleteUser = async (req:Request , res:Response):Promise<void> =>{
    const userId = (req as any).user.userId;
if (!userId){
    res.status(400).json({
        message:"User ID is required"
    }) 
    return
}
console.log("Deleting user with ID:", userId);

try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId])
    if(result.rowCount === 0){
        res.status(404).json({
            message:"User not found"
        })
        return
    }
    res.status(200).json({
        message:"Account deleted successfully"
    })
}catch(error){
    console.error("Error deleting User:",error);
    res.status(500).json({ message: 'Failed to delete account' }); 
    
}
}