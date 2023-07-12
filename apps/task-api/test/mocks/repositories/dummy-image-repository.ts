import { Image } from "../../../src/core/domain/entities/image";
import { IImageRepository } from "../../../src/core/repositories/image.repository";

export class DummyImageRepository implements IImageRepository {
  add(image: Image): Promise<Image> {
    return Promise.resolve(new Image('foobar', '1234', 1024, 768));
  }
  findById(imageId: string): Promise<Image | null> {
    return Promise.resolve(null);
  }
}
