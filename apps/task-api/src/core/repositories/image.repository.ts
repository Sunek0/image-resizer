import { Image } from '../domain/entities/image';

export interface IImageRepository {
  add(image: Image): Promise<Image>;
  findById(imageId: string): Promise<Image | null>;
}
