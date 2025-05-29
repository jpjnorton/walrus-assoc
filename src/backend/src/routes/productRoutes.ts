import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productsController';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);

export default router;
