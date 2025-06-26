import express from 'express';
import { body } from 'express-validator';
import { 
  createOrder, 
  getOrders, 
  getOrder, 
  updateOrderStatus,
  processPayment,
  getUserOrders
} from '../controllers/orderController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = express.Router();

// Create Order (User)
router.post(
  '/',
  authenticate,
  [
    body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
    body('items.*.product').isMongoId().withMessage('Valid product ID is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('shippingAddress.street').notEmpty().withMessage('Street address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.state').notEmpty().withMessage('State is required'),
    body('shippingAddress.zipCode').notEmpty().withMessage('Zip code is required'),
    body('shippingAddress.country').notEmpty().withMessage('Country is required'),
    body('paymentMethod')
      .isIn(['stripe', 'paypal', 'cash_on_delivery'])
      .withMessage('Invalid payment method'),
  ],
  validate,
  createOrder
);

// Get User Orders (User)
router.get('/my-orders', authenticate, getUserOrders);

// Get Single Order (User)
router.get('/:id', authenticate, getOrder);

// Process Payment (User)
router.put(
  '/:id/pay',
  authenticate,
  [
    body('paymentIntentId').optional().isString().withMessage('Payment intent ID must be a string'),
  ],
  validate,
  processPayment
);

// Get All Orders (Admin)
router.get('/', authenticate, authorize('admin'), getOrders);

// Update Order Status (Admin)
router.put(
  '/:id/status',
  authenticate,
  authorize('admin'),
  [
    body('status')
      .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status'),
  ],
  validate,
  updateOrderStatus
);

export default router;
