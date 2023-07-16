import { Service } from 'typedi';
import errors from 'common-errors';
import createImageSizeStream from 'image-size-stream';
import { logger } from '../../config/logger';
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
      try {
        data.pipe(imageSizeStream);
      }
      catch (err: any) {
        logger.error({ error: err.name }, "Can't obtain image data");
        reject(new errors.io.IOError("Can't obtain image data"));
      }
    });
  }
}
