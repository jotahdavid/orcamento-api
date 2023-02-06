import {
  describe, expect, it, vi,
} from 'vitest';
import ProductRepository from '@repositories/ProductRepository';
import UserRepository from '@repositories/UserRepository';
import BudgetController from '@controllers/BudgetController';

describe('BudgetController', () => {
  const defaultHttpRequest = {
    params: {},
    query: {},
    body: {},
  };

  it('should return 422 if userId property is missing at body', async () => {
    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        productsId: [1],
      },
    });

    expect(sut.statusCode).toBe(422);
  });

  it('should return 422 if productsId property is missing at body', async () => {
    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        userId: 1,
      },
    });

    expect(sut.statusCode).toBe(422);
  });

  it('should return 422 if productsId property is not an array', async () => {
    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        userId: 1,
        productsId: 'not-array',
      },
    });

    expect(sut.statusCode).toBe(422);
  });

  it('should return 404 if not exists product with ONE productId specified', async () => {
    vi
      .spyOn(UserRepository, 'findById')
      .mockImplementationOnce(async () => ({ id: 1, name: 'fulano', tax: 80 }));

    vi
      .spyOn(ProductRepository, 'findById')
      .mockImplementationOnce(async () => null);

    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        userId: 1,
        productsId: [2],
      },
    });

    expect(sut.statusCode).toBe(404);
  });

  it('should return 404 if not exists some product with TWO productId specified', async () => {
    vi
      .spyOn(UserRepository, 'findById')
      .mockImplementationOnce(async () => ({ id: 1, name: 'fulano', tax: 80 }));

    vi
      .spyOn(ProductRepository, 'findById')
      .mockImplementation(async (id) => (id === 1 ? null : { id: 1, name: 'produto', price: 2000 }));

    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        userId: 1,
        productsId: [1, 2],
      },
    });

    expect(sut.statusCode).toBe(404);
  });

  it('should return 404 if not exists user with userId specified', async () => {
    vi
      .spyOn(UserRepository, 'findById')
      .mockImplementationOnce(async () => null);

    vi
      .spyOn(ProductRepository, 'findById')
      .mockImplementationOnce(async () => ({ id: 1, name: 'produto', price: 2000 }));

    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        userId: 2,
        productsId: [1],
      },
    });

    expect(sut.statusCode).toBe(404);
  });

  it('should return 200 with productsId empty array', async () => {
    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        userId: 1,
        productsId: [],
      },
    });

    expect(sut.statusCode).toBe(200);
  });

  it('should calculate products total price with user tax and return 1600', async () => {
    vi
      .spyOn(UserRepository, 'findById')
      .mockImplementation(async () => ({ id: 1, name: 'fulano', tax: 80 }));

    vi
      .spyOn(ProductRepository, 'findById')
      .mockImplementationOnce(async () => ({ id: 1, name: 'produto', price: 2000 }));

    const sut = await BudgetController.calculate({
      ...defaultHttpRequest,
      body: {
        userId: 1,
        productsId: [1],
      },
    });

    expect(sut.statusCode).toBe(200);
    expect(sut.body).toHaveProperty('total');
    expect(sut.body.total).toBe(1600);
  });
});
