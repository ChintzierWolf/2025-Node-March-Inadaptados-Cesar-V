import express from 'express';
import {
  getShippingAddressesByUser,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from '../controllers/shippingAddressController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Obtener direcciones de un usuario
router.get('/user/:userId', authMiddleware, getShippingAddressesByUser);

// Crear nueva dirección
router.post('/', authMiddleware, createShippingAddress);

// Actualizar dirección
router.put('/:id', authMiddleware, updateShippingAddress);

// Eliminar dirección
router.delete('/:id', authMiddleware, deleteShippingAddress);

export default router;
