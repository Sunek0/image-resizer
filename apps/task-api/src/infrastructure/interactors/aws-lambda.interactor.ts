import axios from 'axios';
import lambdaConfig from '../../config/aws';
import { ImageResize } from '../../core/domain/entities/image-resize';
import { LambdaInteractor } from '../../core/interactors/lambda.interactor';

export class AWSLambdaInteractor implements LambdaInteractor {
  async resizeImage(imageId: number): Promise<ImageResize> {
    const { data } = await axios.post<ImageResize>(lambdaConfig.resizePath, { imageId })

    return data;
  }
}
