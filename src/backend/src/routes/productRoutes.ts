import { Router } from 'express';

import  cors from 'cors';

import { getProducts, getProductById } from '../controllers/productsController';

const router = Router();

router.use(cors())

router.get('/products', getProducts);
router.get('/products/:id', getProductById);


export default router;
