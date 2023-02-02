import { Request, Response } from 'express';

import UserRepository from '@repositories/UserRepository';

class UserController {
  async index(req: Request, res: Response) {
    const users = await UserRepository.findAll();
    return res.json(users);
  }
}

export default new UserController();
