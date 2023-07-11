import { Inject, Service } from 'typedi';
import { Image } from '../entities/image';
import { IImageRepository } from '../../repositories/image.repository';
import { ICreateImageInput } from '../interfaces/create-image-input';

@Service()
export class CreateImage {
  constructor(@Inject('ImageRepository') private imageRepository: IImageRepository) {}

  async execute(input: ICreateImageInput): Promise<Image> {
    const { path, checksum, width, height, parentId } = input;
    const image = new Image(path, checksum, width, height, parentId);
    await this.imageRepository.add(image);
    return image;
  }
}
