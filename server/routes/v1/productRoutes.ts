/**
 * Artify Sols Backend — Products & Services API Routes
 * /api/v1/products & /api/v1/services
 */

import { Router } from 'express';
import { productService } from '../../services/productService';
import {
  authenticateToken,
  requirePermission,
  AuthenticatedRequest,
} from '../../services/authService';
import { sendSuccess, sendError, ApiErrorCode } from '../../core/apiResponse';

const router = Router();

/**
 * GET /api/v1/products
 */
router.get('/', (req, res) => {
  const { category, type, search } = req.query;
  const products = productService.listProducts({
    category: category as string,
    type: type as any,
    search: search as string,
    status: 'active',
  });
  sendSuccess(res, products);
});

/**
 * GET /api/v1/products/:identifier
 */
router.get('/:identifier', (req, res) => {
  const product = productService.getProductBySlugOrId(req.params.identifier);
  if (!product) {
    sendError(res, 404, ApiErrorCode.RESOURCE_NOT_FOUND, 'Product not found.');
    return;
  }
  sendSuccess(res, product);
});

/**
 * POST /api/v1/products
 */
router.post(
  '/',
  authenticateToken,
  requirePermission('products.manage'),
  (req: AuthenticatedRequest, res) => {
    try {
      const product = productService.createProduct(req.body);
      sendSuccess(res, product, 201);
    } catch (err: any) {
      sendError(res, 400, ApiErrorCode.VALIDATION_ERROR, err?.message);
    }
  }
);

export default router;
