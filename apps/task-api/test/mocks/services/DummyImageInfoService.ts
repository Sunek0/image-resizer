import { ImageInfo } from "../../../src/core/domain/entities/ImageInfo";
import { IImageInfoService } from "../../../src/core/services/IImageInfoService";

export class DummyImageInfoService implements IImageInfoService {
  getImageInfo(data: any): Promise<ImageInfo> {
    return Promise.resolve(new ImageInfo('png', 1024, 768));
  }
}
