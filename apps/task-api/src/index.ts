import 'reflect-metadata';
import { logger } from './config/logger'
import app from './config/app';

try {
  const port = process.env.PORT ?? '3000';

  app.listen(port, () => {
    logger.info({ port }, 'Server is listening...');
  })
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  logger.error(err, 'Uncaught exception');
  process.exit(1);
});
