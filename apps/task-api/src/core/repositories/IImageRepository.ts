import { Image } from '../domain/entities/Image';

export interface IImageRepository {
  add(image: Image): Promise<Image>;
  findById(imageId: string): Promise<Image | null>;
}
