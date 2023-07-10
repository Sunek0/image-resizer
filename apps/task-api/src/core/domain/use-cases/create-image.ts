import { Image } from '../entities/image';
import { ImageRepository } from '../../repositories/image.repository';
import { CreateImageInput } from '../interfaces/create-image-input';


export class CreateImage {
  private imageRepository: ImageRepository;

  constructor(imageRepository: ImageRepository) {
    this.imageRepository = imageRepository;
  }

  async execute(input: CreateImageInput): Promise<Image> {
    const { path, checksum, width, height, parentId } = input;
    const image = new Image(path, checksum, width, height, parentId);
    await this.imageRepository.add(image);
    return image;
  }
}
