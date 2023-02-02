import fetch from 'cross-fetch';

const { MOCKEND_API_URL } = process.env;

if (!MOCKEND_API_URL) {
  throw new Error('MOCKEND_API_URL variable is missing');
}

class UserRepository {
  async findAll() {
    const response = await fetch(`${MOCKEND_API_URL}/users`);
    const users = await response.json();
    return users;
  }
}

export default new UserRepository();
