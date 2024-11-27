import express from 'express';
import { getNewsByTopic } from '../controllers/newsContoller';
import { authenticateToken } from '../middlewares/authMiddlewares';

const router = express.Router();

router.get('/news/:topic',authenticateToken, getNewsByTopic);

export default router;
