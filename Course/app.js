import express, { json } from 'express';
import { createCourseRouter } from './routes/course.js';
import { corsMiddleware } from './middlewares/cors.js';
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const createApp = ({ courseModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable('x-powered-by');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use('/course', createCourseRouter({ courseModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};