import 'express-async-errors';
import restaurantsRouter from '../../interfaces/controllers/restaurants';
import productsRouter from '../../interfaces/controllers/products';
import salesRouter from '../../interfaces/controllers/sales';
import imageRouter from '../../interfaces/controllers/image';
import { setupDatabase } from '../database/setup';
import bodyParser from 'body-parser';
import { env } from '../config/env';
import express from 'express';

const app = express();

app.use(bodyParser.json());

app.use('/restaurants', restaurantsRouter);

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use('/image', imageRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  const path = req.path;

  return res.status(status).json({
    status: status,
    message: message,
    path: path
  });
});

const PORT = env.PORT || 3000;

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});