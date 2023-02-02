import { Router } from 'express';

import UserController from '@controllers/UserController';
import ProductController from '@controllers/ProductController';

const router = Router();

router.get('/users', UserController.index);
router.get('/products', ProductController.index);

export default router;
