import { Inject, Service } from 'typedi';
import { Image } from '../entities/image';
import { IImageRepository } from '../../repositories/image.repository';

@Service()
export class GetImage {
  constructor(@Inject('ImageRepository') private imageRepository: IImageRepository) {}

  async execute(imageId: string): Promise<Image | null> {
    const image = await this.imageRepository.findById(imageId);
    return image;
  }
}
