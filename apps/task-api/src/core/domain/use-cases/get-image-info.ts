import { ImageInfo } from '../entities/image-info';
import { ImageInfoInteractor } from '../../interactors/image-info.interactor';

export class GetImageInfo {
  private imageInfoInteractor: ImageInfoInteractor;

  constructor(imageInfoInteractor: ImageInfoInteractor) {
    this.imageInfoInteractor = imageInfoInteractor;
  }

  async execute(stream: any): Promise<ImageInfo | null> {
    const imageInfo = await this.imageInfoInteractor.getImageInfo(stream);
    return imageInfo;
  }
}
