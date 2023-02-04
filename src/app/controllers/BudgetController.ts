import { Request, Response } from 'express';

import formatZodErrorMessage from '@utils/formatZodErrorMessage';

import CalculateBudgetSchema from '@schemas/CalculateBudgetSchema';
import UserRepository from '@repositories/UserRepository';
import ProductRepository from '@repositories/ProductRepository';

class BudgetController {
  async calculate(req: Request, res: Response) {
    const validation = CalculateBudgetSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(422).json({
        error: formatZodErrorMessage(validation.error),
      });
    }

    const payload = validation.data;

    if (payload.productsId.length === 0) {
      return res.json({
        total: 0,
      });
    }

    const user = await UserRepository.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const products = await Promise.all(
      payload.productsId.map((productId) => ProductRepository.findById(productId)),
    );

    const notFoundProductIndex = products.findIndex((product) => product === null);
    if (notFoundProductIndex !== -1) {
      return res.status(404).json({ error: `Product with id ${payload.productsId[notFoundProductIndex]} not found` });
    }

    const productsTotalSum = products.reduce((acc, product) => {
      const productPrice = product?.price ?? 0;
      return productPrice + acc;
    }, 0);
    const productsTotalPrice = productsTotalSum * (user.tax / 100);

    return res.json({
      total: productsTotalPrice,
    });
  }
}

export default new BudgetController();
