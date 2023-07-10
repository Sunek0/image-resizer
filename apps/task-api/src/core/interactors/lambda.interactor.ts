import { ImageResize } from '../domain/entities/image-resize';

export interface LambdaInteractor {
  resizeImage(imageId: string): Promise<ImageResize>;
}
