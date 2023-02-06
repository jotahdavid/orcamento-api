import { HttpResponse } from '@helpers/ExpressRouteAdapter';
import ProductRepository from '@repositories/ProductRepository';

class ProductController {
  async index(): Promise<HttpResponse> {
    const products = await ProductRepository.findAll();
    return {
      statusCode: 200,
      body: products,
    };
  }
}

export default new ProductController();
