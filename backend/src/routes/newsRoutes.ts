import express from 'express';
import { getNewsByTopic } from '../controllers/newsContoller';

const router = express.Router();

router.get('/news/:topic', getNewsByTopic);

export default router;
