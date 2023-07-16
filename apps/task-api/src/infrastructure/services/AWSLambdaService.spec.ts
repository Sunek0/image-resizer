import axios from 'axios';
import errors from 'common-errors';
import { logger } from '../../config/logger';
import { AWSLambdaService } from './AWSLambdaService';
import { ImageResize } from '../../core/domain/entities/ImageResize';

beforeEach(() => {
  jest.clearAllMocks();
});

const exampleData: ImageResize = {
	status: 'completed',
	imageId: 'd0f26085-9bd3-4398-9cf9-34816b565eef',
	imageBigId: '03495f3d-643c-4e11-8af7-fe99699a4210',
	imageLittleId: 'f8da05d8-aaad-4116-974d-dd78884deabb'
};

describe('Service aws lambda unit tests', () => {
  it('should resizeImage return object if ok', async () => {
    const awsLambdaService = new AWSLambdaService();
    const axiosSpy = jest.spyOn(axios, 'post')
      .mockResolvedValue(Promise.resolve({ data: exampleData }));

    const resizeImage = await awsLambdaService.resizeImage('foobar');

    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(resizeImage).toBeInstanceOf(Object);
  });

  it('should resizeImage throw http status error if response received w message', async () => {
    const awsLambdaService = new AWSLambdaService();
    const axiosSpy = jest.spyOn(axios, 'post')
      .mockResolvedValue(Promise.reject({
        code: 'ERR',
        name: 'ERR_CODE',
        response: {
          status: 404
        },
        data: {
          status: 'error',
          message: 'Error'
        }
      }));

    try {
      await awsLambdaService.resizeImage('foobar');
    } catch (err: any) {
      expect(axiosSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(errors.HttpStatusError);
      expect(logger.error).toHaveBeenCalledTimes(1);
    }
  });

  it('should resizeImage throw http status error if response received wo message', async () => {
    const awsLambdaService = new AWSLambdaService();
    const axiosSpy = jest.spyOn(axios, 'post')
      .mockResolvedValue(Promise.reject({
        code: 'ERR',
        name: 'ERR_CODE',
        message: 'Error',
        response: {
          status: 404
        },
        data: {
          status: 'error'
        }
      }));

    try {
      await awsLambdaService.resizeImage('foobar');
    } catch (err: any) {
      expect(axiosSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(errors.HttpStatusError);
      expect(logger.error).toHaveBeenCalledTimes(1);
    }
  });

  it('should resizeImage throw argument error if not response received', async () => {
    const awsLambdaService = new AWSLambdaService();
    const axiosSpy = jest.spyOn(axios, 'post')
      .mockResolvedValue(Promise.reject({
        data: {}
      }));

    try {
      await awsLambdaService.resizeImage('foobar');
    } catch (err: any) {
      expect(axiosSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(errors.ArgumentError);
      expect(logger.error).toHaveBeenCalledTimes(1);
    }
  });
});
