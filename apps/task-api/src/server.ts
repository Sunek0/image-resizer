import pinoHttp from 'pino-http';
import { v4 as uuidv4 } from 'uuid';
import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import { logger } from './config/logger';
import { connectDatabase } from './infrastructure/database/connection';
import { createTask } from './application/controllers/task-post.controller';
import { getTask } from './application/controllers/task-get.controller';

const app: Express = express();

// Middleware
app.use(pinoHttp());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));

// Connect to the database
connectDatabase().then(async () => {
  logger.info('Database connected');
  // const { createTask } = await import('./application/controllers/task-post.controller');
  // const { getTask } = await import('./application/controllers/task-get.controller');
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.id = uuidv4();
    next()
  });
  app.post('/task', createTask);
  app.get('/task/:taskId', getTask);
}).catch((error) => {
  logger.error(error, 'Database connection failed');
});

// Routes

export default app;
