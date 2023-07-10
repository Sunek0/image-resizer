import { File } from "../../src/core/domain/entities/file";
import { FileRepository } from "../../src/core/repositories/file.repository";

export class DummyFileRepository implements FileRepository {
  putItem(image: File): Promise<void> {
    return Promise.resolve();
  }
  getItem(imagePath: string): Promise<File | null> {
    return Promise.resolve(null);
  }
}
