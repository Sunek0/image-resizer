import { ReadStream, WriteStream } from 'fs';

export interface IFileService {
  fileExists(path: string): Promise<boolean>;
  getReaderStream(path: string): ReadStream;
  getWritableStream(path: string): WriteStream;
  createFolder(path: string, recursive: boolean): Promise<void>;
}
