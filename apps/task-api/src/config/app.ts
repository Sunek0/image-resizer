import { logger } from './logger';
import pinoHttp from 'pino-http';
import express, { Express, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';

import { connectDatabase } from '../infrastructure/database/connection';

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
  const { createTask } = await import("../application/controllers/task-post.controller");
  const { getTask } = await import("../application/controllers/task-get.controller");
  app.post('/task', createTask);
  app.get('/task/:taskId', getTask);
}).catch((error) => {
  logger.error(error, 'Database connection failed');
});

// Routes

export default app;
