import errors from 'common-errors';
import { ImagesRepositoryDDB } from './ImagesRepositoryDDB'
import { DummyDynamoDb } from '../../../test/mocks/database/DummyDynamoDb';
import { Image } from '../../core/domain/entities/Image';

const getFn = jest.fn(() => ({}));
const putFn = jest.fn();

jest.mock("@aws-sdk/lib-dynamodb");
jest.mock("@hexlabs/dynamo-ts", () => {
  return {
    defineTable: jest.fn(),
    TableClient: {
      build: jest.fn(() => {
        return {
          put: putFn,
          get: getFn
        }
      })
    }
  }
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Image repository unit tests', () => {
  it('should have implemented an add method', async () => {
    const dummyDynamoDb = new DummyDynamoDb()
    const imagesRepositoryDDB = new ImagesRepositoryDDB(dummyDynamoDb);
    const image = new Image('foobar', 'checksum', 1024, 768)
    await imagesRepositoryDDB.add(image)

    expect(putFn).toBeCalledTimes(1);
  });

  it('should add method throw data error', async () => {
    const dummyDynamoDb = new DummyDynamoDb()
    const imagesRepositoryDDB = new ImagesRepositoryDDB(dummyDynamoDb);
    const image = new Image('foobar', 'checksum', 1024, 768)

    putFn.mockReturnValueOnce(Promise.reject(new Error()));

    try {
      await imagesRepositoryDDB.add(image)
    }
    catch(err) {
      expect(err).toBeInstanceOf(errors.data.DataError);
    }
  });

  it('should have implemented an findById method', async () => {
    const dummyDynamoDb = new DummyDynamoDb()
    const imagesRepositoryDDB = new ImagesRepositoryDDB(dummyDynamoDb);
    await imagesRepositoryDDB.findById('foobar')

    expect(getFn).toBeCalledTimes(1);
  });

  it('should findById method throw data error', async () => {
    const dummyDynamoDb = new DummyDynamoDb()
    const imagesRepositoryDDB = new ImagesRepositoryDDB(dummyDynamoDb);

    getFn.mockReturnValueOnce(Promise.reject(new Error()));

    try {
      await imagesRepositoryDDB.findById('foobar')
    }
    catch(err) {
      expect(err).toBeInstanceOf(errors.data.DataError);
    }
  });
});
