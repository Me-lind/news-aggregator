import express from 'express';
import { addSubscription, removeSubscription, getSubscriptions } from '../controllers/subscriptionController';
import { authenticateToken } from '../middlewares/authMiddlewares';

const router = express.Router();

router.post('/subscribe', authenticateToken, addSubscription);
router.delete('/unsubscribe', authenticateToken, removeSubscription);
router.get('/subscriptions', authenticateToken, getSubscriptions);

export default router;
