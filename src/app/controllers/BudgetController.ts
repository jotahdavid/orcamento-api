import { HttpRequest, HttpResponse } from '@helpers/ExpressRouteAdapter';
import formatZodErrorMessage from '@utils/formatZodErrorMessage';

import CalculateBudgetSchema from '@schemas/CalculateBudgetSchema';
import UserRepository from '@repositories/UserRepository';
import ProductRepository, { Product } from '@repositories/ProductRepository';

class BudgetController {
  private calculateProductsTotalPriceWithUserTax(products: Product[], userTax: number) {
    const productsTotalSum = products.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    return productsTotalSum * (userTax / 100);
  }

  async calculate(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validation = CalculateBudgetSchema.safeParse(httpRequest.body);

    if (!validation.success) {
      return {
        statusCode: 422,
        body: {
          error: formatZodErrorMessage(validation.error),
        },
      };
    }

    const payload = validation.data;

    if (payload.productsId.length === 0) {
      return {
        statusCode: 200,
        body: { total: 0 },
      };
    }

    const user = await UserRepository.findById(payload.userId);
    if (!user) {
      return {
        statusCode: 404,
        body: { error: 'User not found' },
      };
    }

    const products = await Promise.all(
      payload.productsId.map((productId) => ProductRepository.findById(productId)),
    );

    const notFoundProductIndex = products.findIndex((product) => product === null);
    if (notFoundProductIndex !== -1) {
      return {
        statusCode: 404,
        body: {
          error: `Product with id ${payload.productsId[notFoundProductIndex]} not found`,
        },
      };
    }

    const productsTotalPrice = this.calculateProductsTotalPriceWithUserTax(
      products as Product[],
      user.tax,
    );

    return {
      statusCode: 200,
      body: { total: productsTotalPrice },
    };
  }
}

export default new BudgetController();
