import express from 'express';
import { body, query } from 'express-validator';
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFeaturedProducts,
  searchProducts
} from '../controllers/productController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = express.Router();

// Public Routes
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('category')
      .optional()
      .isIn(['electronics', 'clothing', 'books', 'home', 'sports', 'beauty', 'toys', 'other'])
      .withMessage('Invalid category'),
    query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be non-negative'),
    query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be non-negative'),
    query('sort')
      .optional()
      .isIn(['price', '-price', 'createdAt', '-createdAt', 'title', '-title'])
      .withMessage('Invalid sort option'),
  ],
  validate,
  getProducts
);

router.get('/featured', getFeaturedProducts);

router.get(
  '/search',
  [query('q').notEmpty().withMessage('Search query is required')],
  validate,
  searchProducts
);

router.get('/:id', getProduct);

// Admin Routes
router.post(
  '/',
  authenticate,
  authorize('admin'),
  [
    body('title')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .trim()
      .isLength({ min: 1, max: 2000 })
      .withMessage('Description must be between 1 and 2000 characters'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
    body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
    body('category')
      .isIn(['electronics', 'clothing', 'books', 'home', 'sports', 'beauty', 'toys', 'other'])
      .withMessage('Invalid category'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  ],
  validate,
  createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 1, max: 2000 })
      .withMessage('Description must be between 1 and 2000 characters'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be non-negative'),
    body('images').optional().isArray({ min: 1 }).withMessage('At least one image is required'),
    body('category')
      .optional()
      .isIn(['electronics', 'clothing', 'books', 'home', 'sports', 'beauty', 'toys', 'other'])
      .withMessage('Invalid category'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  ],
  validate,
  updateProduct
);

router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

export default router;
