import { ImageResize } from '../domain/entities/image-resize';

export interface ILambdaService {
  resizeImage(imageId: string): Promise<ImageResize>;
}
