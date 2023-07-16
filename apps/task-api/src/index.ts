import 'reflect-metadata';
import config from 'config';
import { join, resolve } from 'path';
import { logger } from './config/logger';
import { Server } from './server';

try {
  global.appRoot = join(resolve(__dirname), '../');

  const port = config.server.port;
  const server = new Server();

  server.initialize()
    .then(() => server.listen(port));
} catch (err: any) {
  logger.error({ error: err }, 'Server initialization exception');
  process.exit(1);
}

process.on('uncaughtException', err => {
  logger.error({ error: err }, 'Uncaught exception');
  process.exit(1);
});
