import { Image } from '../domain/entities/image';

export interface ImageRepository {
  add(image: Image): Promise<Image>;
  findById(imageId: string): Promise<Image | null>;
  // update(image: Image): Promise<any>;
}
