import express from 'express';
import { getUsers, getUserById, updateUserRole, deleteUser } from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Admin-only routes
router.get('/', authenticate, authorize('admin'), getUsers);
router.get('/:id', authenticate, authorize('admin'), getUserById);
router.put('/:id/role', authenticate, authorize('admin'), updateUserRole);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;
