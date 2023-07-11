import { Inject, Service } from 'typedi';
import { ImageInfo } from '../entities/image-info';
import { IImageInfoService } from '../../services/image-info.service';

@Service()
export class GetImageInfo {
  constructor(@Inject('ImageInfoService') private imageInfoService: IImageInfoService) {}

  async execute(stream: any): Promise<ImageInfo | null> {
    const imageInfo = await this.imageInfoService.getImageInfo(stream);
    return imageInfo;
  }
}
