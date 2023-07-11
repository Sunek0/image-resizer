import 'reflect-metadata';
import config from 'config';
import { join, resolve } from 'path';
import { logger } from './config/logger';
import app from './server';

try {
  global.appRoot = join(resolve(__dirname), '../');
  const port = config.server.port;

  app.listen(port, () => {
    logger.info({ port }, 'Server is listening...');
  });
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  logger.error(err, 'Uncaught exception');
  process.exit(1);
});
