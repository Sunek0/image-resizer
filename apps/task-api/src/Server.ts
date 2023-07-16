import pinoHttp from 'pino-http';
import { v4 as uuidv4 } from 'uuid';
import express, { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import Container from 'typedi';
import { logger } from './config/logger';
import { DynamoDBDatabase } from './infrastructure/database/DynamoDBDatabase';
import { PostTaskController } from './application/controllers/PostTaskController';
import { GetTaskController } from './application/controllers/GetTaskController';
import { TasksRepositoryDDB } from './infrastructure/repositories/TasksRepositoryDDB';
import { LocalFileChecksumService } from './infrastructure/services/LocalFileChecksumService';
import { FileRepositoryS3 } from './infrastructure/repositories/FileRepositoryS3';
import { LocalFileService } from './infrastructure/services/LocalFileService';
import { LocalImageInfoService } from './infrastructure/services/LocalImageInfoService';
import { ImagesRepositoryDDB } from './infrastructure/repositories/ImagesRepositoryDDB';
import { AWSLambdaService } from './infrastructure/services/AWSLambdaService';

export class Server {
  app: Express;
  constructor() {
    this.app = express();
  }

  async initialize(): Promise<void> {
    this.app.use(pinoHttp());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));

    const dynamoDb = Container.get(DynamoDBDatabase);

    try {
      await dynamoDb.connect();

      logger.info('Database connected');
      Container.set('FileChecksumService', new LocalFileChecksumService());
      Container.set('FileRepository', new FileRepositoryS3());
      Container.set('FileService', new LocalFileService());
      Container.set('ImageInfoService', new LocalImageInfoService());
      Container.set('ImageRepository', new ImagesRepositoryDDB(dynamoDb));
      Container.set('LambdaService', new AWSLambdaService());
      Container.set('TaskRepository', new TasksRepositoryDDB(dynamoDb));

      const getTaskController = Container.get(GetTaskController);
      const postTaskController = Container.get(PostTaskController);
      this.app.post('/task', postTaskController.request.bind(postTaskController));
      this.app.get('/task/:taskId', getTaskController.request.bind(getTaskController));

      this.app.use((req: Request, res: Response, next: NextFunction) => {
        req.id = uuidv4();
        next();
      });
    }
    catch (err: any) {
      logger.error({ error: err }, 'Database connection failed');
    }
  }

  listen (port: number): void {
    this.app.listen(port, () => {
      logger.info({ port }, 'Server is listening...');
    });
  }
}
