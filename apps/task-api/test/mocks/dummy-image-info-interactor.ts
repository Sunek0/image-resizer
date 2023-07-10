import { ImageInfo } from "../../src/core/domain/entities/image-info";
import { ImageInfoInteractor } from "../../src/core/interactors/image-info.interactor";

export class DummyImageInfoInteractor implements ImageInfoInteractor {
  getImageInfo(data: any): Promise<ImageInfo> {
    return Promise.resolve(new ImageInfo('png', 1024, 768));
  }
}
