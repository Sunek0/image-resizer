import axios from 'axios';
import config from 'config';
import { ImageResize } from '../../core/domain/entities/image-resize';
import { ILambdaService } from '../../core/services/lambda.service';

export class AWSLambdaService implements ILambdaService {
  async resizeImage(imageId: string): Promise<ImageResize> {
    const { data } = await axios.post<ImageResize>(config.aws.lambda.paths.resize, { imageId });

    return data;
  }
}
