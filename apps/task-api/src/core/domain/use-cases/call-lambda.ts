import { Inject, Service } from 'typedi';
import { ImageResize } from '../entities/image-resize';
import { ILambdaService } from '../../services/lambda.service';

@Service()
export class CallLambda {
  constructor(@Inject('LambdaService') private lambdaService: ILambdaService) {}

  async execute(imageId: string): Promise<ImageResize> {
    const result = await this.lambdaService.resizeImage(imageId);
    return result;
  }
}
