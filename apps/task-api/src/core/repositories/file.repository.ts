import { File } from '../domain/entities/file';

export interface FileRepository {
  putItem(image: File): Promise<void>;
  getItem(imagePath: string): Promise<File | null>;
}
