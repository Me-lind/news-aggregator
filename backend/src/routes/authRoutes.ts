import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import {validateEmail,validatePassword} from '../validations/emailPasswordValidations'
import { authenticateToken } from '../middlewares/authMiddlewares';
import { deleteUser } from '../controllers/deleteUser';

const router = express.Router();

router.post('/register',[validateEmail,validatePassword], registerUser);
router.post('/login', loginUser);
router.delete('/delete-user',authenticateToken,deleteUser)

export default router;
