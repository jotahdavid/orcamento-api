import { Router } from 'express';

import UserController from '@controllers/UserController';
import ProductController from '@controllers/ProductController';
import BudgetController from '@controllers/BudgetController';

const router = Router();

router.get('/users', UserController.index);
router.get('/products', ProductController.index);
router.post('/budget', BudgetController.calculate);

export default router;
