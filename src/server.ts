import express from 'express';
import 'dotenv/config';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT ?? 3001;
// eslint-disable-next-line no-console
app.listen(3000, () => console.log(`🔥 Server is running on http://localhost:${PORT}`));
