import pinoHttp from 'pino-http';
import { v4 as uuidv4 } from 'uuid';
import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import Container from 'typedi';
import { logger } from './config/logger';
import { DynamoDBDatabase } from './infrastructure/database/dynamodb';
import { PostTaskController } from './application/controllers/task-post.controller';
import { GetTaskController } from './application/controllers/task-get.controller';

const app: Express = express();

app.use(pinoHttp());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));

const dynamoDb = Container.get(DynamoDBDatabase);

dynamoDb.connect().then(() => {
  logger.info('Database connected');
  const getTaskController = Container.get(GetTaskController);
  const postTaskController = Container.get(PostTaskController);
  app.post('/task', postTaskController.request.bind(postTaskController));
  app.get('/task/:taskId', getTaskController.request.bind(getTaskController));

  app.use((req: Request, res: Response, next: NextFunction) => {
    req.id = uuidv4();
    next()
  });
}).catch((error) => {
  logger.error(error, 'Database connection failed');
});


export default app;
