import express from 'express';
import {requestPasswordReset} from '../controllers/requestPasswordReset'
import {resetPassword} from '../controllers/resetPassword'

const router = express.Router();

router.post('/request-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)

export default router;
