import errors from 'common-errors';
import { FileRepositoryS3 } from './FileRepositoryS3'
import { File } from '../../core/domain/entities/File';

const sendFn = jest.fn(() => Promise.resolve('data'));

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn(() => {
      return {
        send: sendFn
      }
    }),
    GetObjectCommand: jest.fn()
  };
});

const doneFn = jest.fn(() => Promise.resolve())

jest.mock('@aws-sdk/lib-storage', () => {
  return {
    Upload: jest.fn(() => {
      return {
        done: doneFn
      }
    })
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('File repository unit tests', () => {
  it('should have implemented a putItem method and return File instance', async () => {
    const fileRepositoryS3 = new FileRepositoryS3();
    const file = new File('name', 'data');

    await fileRepositoryS3.putItem(file);

    expect(doneFn).toHaveBeenCalledTimes(1);
  });

  it('should findById method throw data error', async () => {
    const fileRepositoryS3 = new FileRepositoryS3();
    const file = new File('name', 'data');

    doneFn.mockReturnValueOnce(Promise.reject());

    try {
      await fileRepositoryS3.putItem(file);
    }
    catch(err) {
      expect(err).toBeInstanceOf(errors.data.DataError);
    }
  });

  it('should have implemented a getItem method and return File instance', async () => {
    const fileRepositoryS3 = new FileRepositoryS3();

    const data = await fileRepositoryS3.getItem('foobar');

    expect(data).toBeInstanceOf(File);
  });

  it('should findById method throw data error', async () => {
    const fileRepositoryS3 = new FileRepositoryS3();


    sendFn.mockReturnValueOnce(Promise.reject());

    try {
      await fileRepositoryS3.getItem('foobar');
    }
    catch(err) {
      expect(err).toBeInstanceOf(errors.data.DataError);
    }
  });
});
