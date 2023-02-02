import { Request, Response } from 'express';

import ProductRepository from '@repositories/ProductRepository';

class ProductController {
  async index(req: Request, res: Response) {
    const products = await ProductRepository.findAll();
    return res.json(products);
  }
}

export default new ProductController();
