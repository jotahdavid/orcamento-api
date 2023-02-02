import { z } from 'zod';

export default z.object({
  userId: z.number(),
  productsId: z.array(z.number()),
});
