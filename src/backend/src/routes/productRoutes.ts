import { Router } from 'express';
<<<<<<< HEAD
=======

import  cors from 'cors';

>>>>>>> MitchTODO-main
import { getProducts, getProductById } from '../controllers/productsController';

const router = Router();

<<<<<<< HEAD
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
=======
router.use(cors()) // THIS IS ONLY FOR DEVELOPMENT WE DONT WANT CROSS ORIGIN REQUESTS

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

>>>>>>> MitchTODO-main

export default router;
