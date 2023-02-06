import { HttpResponse } from '@helpers/ExpressRouteAdapter';
import UserRepository from '@repositories/UserRepository';

class UserController {
  async index(): Promise<HttpResponse> {
    const users = await UserRepository.findAll();
    return {
      statusCode: 200,
      body: users,
    };
  }
}

export default new UserController();
