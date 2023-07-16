import errors from 'common-errors';
import { TasksRepositoryDDB } from './TasksRepositoryDDB';
import { DummyDynamoDb } from '../../../test/mocks/database/DummyDynamoDb';
import { Task } from '../../core/domain/entities/Task';
import { TaskStatus } from '../../core/domain/entities/TaskStatus';

const getFn = jest.fn(() => ({}));
const putFn = jest.fn();
const updateFn = jest.fn();

jest.mock('@aws-sdk/lib-dynamodb');
jest.mock('@hexlabs/dynamo-ts', () => {
  return {
    defineTable: jest.fn(),
    TableClient: {
      build: jest.fn(() => {
        return {
          put: putFn,
          get: getFn,
          update: updateFn
        };
      })
    }
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Task repository unit tests', () => {
  it('should have implemented an add method', async () => {
    const dummyDynamoDb = new DummyDynamoDb();
    const localFileService = new TasksRepositoryDDB(dummyDynamoDb);
    const task = new Task('foobar', TaskStatus.Processing);
    await localFileService.add(task);

    expect(putFn).toBeCalledTimes(1);
  });

  it('should add method throw data error', async () => {
    const dummyDynamoDb = new DummyDynamoDb();
    const localFileService = new TasksRepositoryDDB(dummyDynamoDb);
    const task = new Task('foobar', TaskStatus.Processing);

    putFn.mockReturnValueOnce(Promise.reject(new Error()));

    try {
      await localFileService.add(task);
    } catch (err) {
      expect(err).toBeInstanceOf(errors.data.DataError);
    }
  });


  it('should have implemented an findById method', async () => {
    const dummyDynamoDb = new DummyDynamoDb();
    const localFileService = new TasksRepositoryDDB(dummyDynamoDb);
    await localFileService.findById('foobar');

    expect(getFn).toBeCalledTimes(1);
  });

  it('should findById method throw data error', async () => {
    const dummyDynamoDb = new DummyDynamoDb();
    const localFileService = new TasksRepositoryDDB(dummyDynamoDb);

    getFn.mockReturnValueOnce(Promise.reject(new Error()));

    try {
      await localFileService.findById('foobar');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.data.DataError);
    }
  });

  it('should have implemented an update method', async () => {
    const dummyDynamoDb = new DummyDynamoDb();
    const localFileService = new TasksRepositoryDDB(dummyDynamoDb);
    await localFileService.update('foobar', TaskStatus.Processing);

    expect(updateFn).toBeCalledTimes(1);
  });

  it('should add method throw data error', async () => {
    const dummyDynamoDb = new DummyDynamoDb();
    const localFileService = new TasksRepositoryDDB(dummyDynamoDb);

    updateFn.mockReturnValueOnce(Promise.reject(new Error()));

    try {
      await localFileService.update('foobar', TaskStatus.Failed);
    } catch (err) {
      expect(err).toBeInstanceOf(errors.data.DataError);
    }
  });
});
