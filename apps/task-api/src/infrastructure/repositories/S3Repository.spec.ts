import { S3Client } from '@aws-sdk/client-s3';
import config from 'config';
import { S3Repository } from './S3Repository';
import { DummyDynamoDb } from '../../../test/mocks/database/DummyDynamoDb';

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn()
  };
});

jest.mock('config', () => {
  return {
    get: jest.fn(() => ({
      accessKeyId: '',
      region: '',
      secretAccessKey: ''
    }))
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('S3 repository unit tests', () => {
  it('should have call to aws s3 client', async () => {
    const localFileService = new S3Repository();

    expect(S3Client).toBeCalledTimes(1);
  });

  it('should get config', async () => {
    const localFileService = new S3Repository();

    expect(config.get).toBeCalledTimes(1);
  });
});
