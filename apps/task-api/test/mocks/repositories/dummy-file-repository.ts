import { File } from "../../../src/core/domain/entities/file";
import { IFileRepository } from "../../../src/core/repositories/file.repository";

export class DummyFileRepository implements IFileRepository {
  putItem(image: File): Promise<void> {
    return Promise.resolve();
  }
  getItem(imagePath: string): Promise<File | null> {
    return Promise.resolve(null);
  }
}
