import { Router } from 'express';
import { register, login, logout, forgotPassword, changePassword } from '../controllers/authController';
import { registerValidator, loginValidator, forgotPasswordValidator, changePasswordValidator } from '../validations/authValidation';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/forgot-password', forgotPasswordValidator, forgotPassword);
router.post('/change-password', changePasswordValidator, changePassword);
router.get('/logout', logout);

export default router;




