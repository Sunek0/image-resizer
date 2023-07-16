import errors from 'common-errors';
import { logger } from '../../config/logger';
import { LocalImageInfoService } from './local-image-info.service'

beforeEach(() => {
  jest.clearAllMocks();
});


describe('Service locla image info unit tests', () => {
  it('should getImageInfo correctly', () => {
    const onFn = jest.fn().mockImplementationOnce((name, cb) => {
      console.log('odiofasdfdasdf')
      expect(name).toBe('size');
      cb({ width: 1024, height: 768 });
    })

    jest.mock("image-size-stream", () => {
        return () => ({
            on: onFn
        });
    });
    const dummyLocalImageInfoService = new LocalImageInfoService();

    const dummyData = {
      pipe: jest.fn()
    }

    dummyLocalImageInfoService.getImageInfo(dummyData);

    expect(dummyData.pipe).toHaveBeenCalledTimes(1);
  });

  it('should throw an error', () => {
    jest.mock("image-size-stream", () => {
        return () => ({
            on: jest.fn()
        });
    });
    const dummyLocalImageInfoService = new LocalImageInfoService();

    const dummyData = {
      pipe: jest.fn().mockImplementation(() => {
        throw new Error();
      })
    }

    dummyLocalImageInfoService.getImageInfo(dummyData)
      .catch((err: any) => {
        expect(dummyData.pipe).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(err).toBeInstanceOf(errors.io.IOError);
      });
  });
});
