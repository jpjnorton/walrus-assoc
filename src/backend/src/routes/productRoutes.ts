import { Router } from 'express';

import  cors from 'cors';

import { getProducts, getProductById } from '../controllers/productsController';

const router = Router();

router.use(cors()) // THIS IS ONLY FOR DEVELOPMENT WE DONT WANT CROSS ORIGIN REQUESTS

router.get('/products', getProducts);
router.get('/product/:id', getProductById);


export default router;
