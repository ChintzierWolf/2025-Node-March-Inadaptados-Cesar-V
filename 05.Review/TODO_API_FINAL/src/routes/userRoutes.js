import express from 'express';
import { getUser, getUsers, deleteUser, updateUser } from '../controllers/userController.js';
import { body, param } from 'express-validator';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/:userId',[
    param('userId')
        .isMongoId().withMessage('userId must be a valid Mongo ObjectId')
], validate /* Chequeamos si hubo errores de validación*/ ,getUser);


router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;