import { File } from '../domain/entities/file';

export interface IFileRepository {
  putItem(image: File): Promise<void>;
  getItem(imagePath: string): Promise<File | null>;
}
