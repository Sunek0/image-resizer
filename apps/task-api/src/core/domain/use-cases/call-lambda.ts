import { ImageResize } from '../entities/image-resize';
import { ILambdaService } from '../../services/lambda.service';

export class CallLambda {
  private lambdaService: ILambdaService;

  constructor(lambdaService: ILambdaService) {
    this.lambdaService = lambdaService;
  }

  async execute(imageId: string): Promise<ImageResize> {
    const result = await this.lambdaService.resizeImage(imageId);
    return result;
  }
}
