import { Service } from 'typedi';
import createImageSizeStream from 'image-size-stream';
import { ImageInfo } from '../../core/domain/entities/image-info';
import { IImageInfoService } from '../../core/services/image-info.service';

@Service('ImageInfoService')
export class LocalImageInfoService implements IImageInfoService {
  async getImageInfo(data: any): Promise<ImageInfo> {
    const imageSizeStream = createImageSizeStream();
    return new Promise((resolve, reject) => {
      imageSizeStream.on('size', (dimensions: any) => {
        const imageInfo = new ImageInfo(dimensions.width, dimensions.height, dimensions.type);
        resolve(imageInfo);
      });

      data.pipe(imageSizeStream);
    });
  }
}
