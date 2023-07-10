import createImageSizeStream from 'image-size-stream';
import { ImageInfo } from '../../core/domain/entities/image-info';
import { ImageInfoInteractor } from '../../core/interactors/image-info.interactor';

export class LocalImageInfoInteractor implements ImageInfoInteractor {
  async getImageInfo(data: any): Promise<ImageInfo> {
    const imageSizeStream = createImageSizeStream();
    return new Promise((resolve, reject) => {
      imageSizeStream.on('size', (dimensions: any) => {
        const imageInfo = new ImageInfo(dimensions.width, dimensions.height, dimensions.type);
        resolve(imageInfo)
      });

      data.pipe(imageSizeStream);
    })
  }
}
