import { Image } from '../entities/image';
import { IImageRepository } from '../../repositories/image.repository';
import { ICreateImageInput } from '../interfaces/create-image-input';


export class CreateImage {
  private imageRepository: IImageRepository;

  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(input: ICreateImageInput): Promise<Image> {
    const { path, checksum, width, height, parentId } = input;
    const image = new Image(path, checksum, width, height, parentId);
    await this.imageRepository.add(image);
    return image;
  }
}
