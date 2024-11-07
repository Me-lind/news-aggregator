import express from 'express';
import { getUserDetails } from '../controllers/getUserDetails';
import { authenticateToken } from '../middlewares/authMiddlewares';

const router = express.Router();

router.get('/user', authenticateToken, getUserDetails);

export default router;
