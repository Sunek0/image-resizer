import { DynamoDBDatabase } from './dynamodb'

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDB: jest.fn(() => Promise.resolve())
  }
})

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Dynamodb class unit test', () => {
  it('should object has connect method', async () => {
    const localFileService = new DynamoDBDatabase();
    expect(localFileService.connect).toBeInstanceOf(Function);
  });

  it('should connect populate instance property', async () => {
    const localFileService = new DynamoDBDatabase();

    localFileService.connect();

    expect(localFileService.instance).toBeInstanceOf(Promise);
  });
});
