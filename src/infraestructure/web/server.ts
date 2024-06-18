import imageRouter from '../../interfaces/controllers/image';
import { setupDatabase } from '../database/setup';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});