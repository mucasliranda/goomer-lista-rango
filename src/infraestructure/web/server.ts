import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { setupDatabase } from '../database/setup';

dotenv.config();

console.log('iniciando server');

const app = express();
app.use(bodyParser.json());

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