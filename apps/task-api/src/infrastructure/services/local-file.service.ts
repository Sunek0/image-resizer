import fs, { promises as fsp } from 'fs';
import { Service } from 'typedi';
import { IFileService } from '../../core/services/file.service';

@Service('FileService')
export class LocalFileService implements IFileService {
  async fileExists(path: string): Promise<boolean> {
    return fsp.stat(path)
      .then(() => true)
      .catch((e) => false);
  }

  getReaderStream(path: string): fs.ReadStream {
    return fs.createReadStream(path);
  }

  getWritableStream(path: string): fs.WriteStream {
    return fs.createWriteStream(path);
  }

  async createFolder(path: string, recursive: boolean = false): Promise<void> {
    await fsp.mkdir(path, { recursive });
  }
}
