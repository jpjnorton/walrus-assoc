import { Router } from 'express';
import cors from 'cors';
import { getProducts, getProductById } from '../controllers/productsController';

// Create a new router instance
const router = Router();

// Apply CORS middleware to the router
router.use(cors()) // THIS IS ONLY FOR DEVELOPMENT WE DONT WANT CROSS ORIGIN REQUESTS

// Define routes for products
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Export the router to be used in the main app
export default router;
