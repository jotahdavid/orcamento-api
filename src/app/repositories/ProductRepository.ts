import fetch from 'cross-fetch';

const { MOCKEND_API_URL } = process.env;

if (!MOCKEND_API_URL) {
  throw new Error('MOCKEND_API_URL variable is missing');
}

class ProductRepository {
  async findAll() {
    const response = await fetch(`${MOCKEND_API_URL}/products`);
    const products = await response.json();
    return products;
  }
}

export default new ProductRepository();
