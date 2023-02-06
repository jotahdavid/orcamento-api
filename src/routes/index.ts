import { Router } from 'express';

import ExpressAdapter from '@helpers/ExpressRouteAdapter';

import UserController from '@controllers/UserController';
import ProductController from '@controllers/ProductController';
import BudgetController from '@controllers/BudgetController';

const router = Router();

router.get('/users', ExpressAdapter.adapt(UserController.index));
router.get('/products', ExpressAdapter.adapt(ProductController.index));
router.post('/budget', BudgetController.calculate);

export default router;
