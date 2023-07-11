import { ImageInfo } from '../entities/image-info';
import { IImageInfoService } from '../../services/image-info.service';

export class GetImageInfo {
  private imageInfoService: IImageInfoService;

  constructor(imageInfoService: IImageInfoService) {
    this.imageInfoService = imageInfoService;
  }

  async execute(stream: any): Promise<ImageInfo | null> {
    const imageInfo = await this.imageInfoService.getImageInfo(stream);
    return imageInfo;
  }
}
