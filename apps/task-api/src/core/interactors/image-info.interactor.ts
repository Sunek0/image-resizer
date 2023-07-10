import { ImageInfo } from '../domain/entities/image-info';

export interface ImageInfoInteractor {
  getImageInfo(data: any): Promise<ImageInfo>;
}
