import { ImageResize } from '../entities/image-resize';
import { LambdaInteractor } from '../../interactors/lambda.interactor';
import { CreateTaskInput } from '../interfaces/create-task-input';


export class CallLambda {
  private lambdaInteractor: LambdaInteractor;

  constructor(lambdaInteractor: LambdaInteractor) {
    this.lambdaInteractor = lambdaInteractor;
  }

  async execute(imageId: string): Promise<ImageResize> {
    const result = await this.lambdaInteractor.resizeImage(imageId);
    return result;
  }
}
