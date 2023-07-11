import axios from 'axios';
import config from 'config';
import { Service } from 'typedi';
import { ImageResize } from '../../core/domain/entities/image-resize';
import { ILambdaService } from '../../core/services/lambda.service';

@Service('LambdaService')
export class AWSLambdaService implements ILambdaService {
  async resizeImage(imageId: string): Promise<ImageResize> {
    const { data } = await axios.post<ImageResize>(config.aws.lambda.paths.resize, { imageId });

    return data;
  }
}
