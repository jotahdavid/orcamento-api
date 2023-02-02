import fetch from 'cross-fetch';

const { MOCKEND_API_URL } = process.env;

if (!MOCKEND_API_URL) {
  throw new Error('MOCKEND_API_URL variable is missing');
}

export interface User {
  id: number;
  name: string;
  tax: number;
}

class UserRepository {
  async findAll(): Promise<User[]> {
    const response = await fetch(`${MOCKEND_API_URL}/users`);
    const users = await response.json();
    return users;
  }
}

export default new UserRepository();
