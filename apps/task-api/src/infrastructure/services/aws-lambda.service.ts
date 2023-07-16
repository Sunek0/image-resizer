import axios from 'axios';
import config from 'config';
import errors from 'common-errors';
import { logger } from '../../config/logger';
import { Service } from 'typedi';
import { ImageResize } from '../../core/domain/entities/image-resize';
import { ILambdaService } from '../../core/services/lambda.service';

@Service('LambdaService')
export class AWSLambdaService implements ILambdaService {
  async resizeImage(imageId: string): Promise<ImageResize> {
    try {
      const { data } = await axios.post<ImageResize>(config.aws.lambda.paths.resize, { imageId });

      return data;
    }
    catch (err: any) {
      if (err.response) {
        logger.error({
          code: err.code,
          name: err.name,
          message: err.data?.message || err.message,
          status: err.response.status
        }, 'Failed to request Lambda function');
        throw new errors.HttpStatusError(err.response.status, err.data?.message || err.code)
      } else {
        logger.error({
          code: err.code,
          name: err.name,
          message: err.message
        }, 'Failed to request Lambda function');
        throw new errors.ArgumentError(err.code, err)
      }
    }
  }
}
