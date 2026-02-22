import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.post('/register',[
    body('displayName')
        .notEmpty().withMessage('displayName is required')
        .isLength({ min: 2, max: 50 }).withMessage('displayName must be between 2 and 50 characters')
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage('displayName must contain only letters and numbers'),
    body('userName')
        .notEmpty().withMessage('userName is required')
        .isLength({ min: 2, max: 50 }).withMessage('userName must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/).withMessage('userName must contain only letters'),
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('valid email is required')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 6}).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter'),
    body('role')
        .optional()
        .isIn(['leader', 'member', 'admin']).withMessage('Role must be leader, member or admin'),
    body('phone')
        .notEmpty().withMessage('phone is required')
        .isLength({ min: 10, max: 10}).withMessage('Phone must be exactly 10 digits')
        .matches(/^[0-9]+$/).withMessage('Phone must contain only numbers'),
    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be boolean')
], validate ,register);

router.post('/login', [
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('valid email is required ')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('password is required')
], validate, login);



export default router;