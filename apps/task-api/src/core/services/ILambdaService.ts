import { ImageResize } from '../domain/entities/ImageResize';

export interface ILambdaService {
  resizeImage(imageId: string): Promise<ImageResize>;
}
