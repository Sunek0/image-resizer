import { ImageInfo } from '../domain/entities/ImageInfo';

export interface IImageInfoService {
  getImageInfo(data: any): Promise<ImageInfo>;
}
