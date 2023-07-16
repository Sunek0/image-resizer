import { ReadStream, WriteStream, fstat } from "fs";
import { IFileService } from "../../../src/core/services/IFileService";

export class DummyFileService implements IFileService {
  fileExists(path: string): Promise<boolean> {
    return Promise.resolve(true);
  }
  getReaderStream(path: string): ReadStream {
    return new ReadStream();
  }
  getWritableStream(path: string): WriteStream {
    return new WriteStream();
  }
  createFolder(path: string, recursive: boolean): Promise<void> {
    return Promise.resolve();
  }
}
