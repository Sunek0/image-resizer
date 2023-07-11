import { Image } from '../entities/image';
import { IImageRepository } from '../../repositories/image.repository';

export class GetImage {
  private imageRepository: IImageRepository;

  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(imageId: string): Promise<Image | null> {
    const image = await this.imageRepository.findById(imageId);
    return image;
  }
}
