import { Image } from '../entities/image';
import { ImageRepository } from '../../repositories/image.repository';

export class GetImage {
  private imageRepository: ImageRepository;

  constructor(imageRepository: ImageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(imageId: string): Promise<Image | null> {
    const image = await this.imageRepository.findById(imageId);
    return image;
  }
}
