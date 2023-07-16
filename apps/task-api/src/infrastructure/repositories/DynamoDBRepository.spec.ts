import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBRepository } from './DynamoDBRepository'
import { DummyDynamoDb } from '../../../test/mocks/database/DummyDynamoDb';

jest.mock("@aws-sdk/lib-dynamodb");

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Service local file unit tests', () => {
  it('should have a dbClient property', async () => {
    const dummyDynamoDb = new DummyDynamoDb()
    const localFileService = new DynamoDBRepository(dummyDynamoDb);

    expect(DynamoDBDocument.from).toBeCalledTimes(1);
  });
});
