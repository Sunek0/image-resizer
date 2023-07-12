import { ReadStream, WriteStream, fstat } from "fs";
import { IFileService } from "../../../src/core/services/file.service";
import { Readable } from "stream";

export class DummyFileService implements IFileService {
  fileExists(path: string): Promise<boolean> {
    return Promise.resolve(true);
  }
  getReaderStream(path: string): ReadStream {
    let eventCount = 0;
  const mockEventStream = new Readable({
    objectMode: true,
    read: function (size) {
      if (eventCount < 10) {
        eventCount = eventCount + 1;
        return this.push({message: `event${eventCount}`})
      } else {
        return this.push(null);
      }
    }
  });
    return mockEventStream;
  }
  getWritableStream(path: string): WriteStream {
    return new WriteStream();
  }
  createFolder(path: string, recursive: boolean): Promise<void> {
    return Promise.resolve();
  }
}
