import errors from 'common-errors';
import { Service } from 'typedi';
import fs, { promises as fsp } from 'fs';
import { logger } from '../../config/logger';
import { IFileService } from '../../core/services/IFileService';

@Service('FileService')
export class LocalFileService implements IFileService {
  async fileExists(path: string): Promise<boolean> {
    return fsp.stat(path)
      .then(() => true)
      .catch(() => false);
  }

  getReaderStream(path: string): fs.ReadStream {
    try {
      return fs.createReadStream(path);
    }
    catch (err: any) {
      logger.error({ path, error: err.name }, "Can't create read stream");
      throw new errors.io.IOError(`Can't create read stream to ${path}`);
    }
  }

  getWritableStream(path: string): fs.WriteStream {
    try {
      return fs.createWriteStream(path);
    }
    catch (err: any) {
      logger.error({ path, error: err.name }, "Can't create directory");
      throw new errors.io.IOError(`Can't create write stream to ${path}`);
    }
  }

  async createFolder(path: string, recursive: boolean = false): Promise<void> {
    await fsp.mkdir(path, { recursive })
      .catch((err: any) => {
        logger.error({ path, error: err.name }, "Can't create directory");
        throw new errors.io.IOError(`Can't create ${path}`);
      });
  }
}
