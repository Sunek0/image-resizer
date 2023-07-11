import { ImageInfo } from '../domain/entities/image-info';

export interface IImageInfoService {
  getImageInfo(data: any): Promise<ImageInfo>;
}
