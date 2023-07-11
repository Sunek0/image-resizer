import 'reflect-metadata';
import config from 'config';
import { logger } from './config/logger';
import app from './server';

try {
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
