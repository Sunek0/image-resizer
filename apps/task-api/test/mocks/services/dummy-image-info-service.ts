import { ImageInfo } from "../../../src/core/domain/entities/image-info";
import { IImageInfoService } from "../../../src/core/services/image-info.service";

export class DummyImageInfoService implements IImageInfoService {
  getImageInfo(data: any): Promise<ImageInfo> {
    return Promise.resolve(new ImageInfo('png', 1024, 768));
  }
}
