import { File } from "../../../src/core/domain/entities/File";
import { IFileRepository } from "../../../src/core/repositories/IFileRepository";

export class DummyFileRepository implements IFileRepository {
  putItem(image: File): Promise<void> {
    return Promise.resolve();
  }
  getItem(imagePath: string): Promise<File | null> {
    return Promise.resolve(null);
  }
}
