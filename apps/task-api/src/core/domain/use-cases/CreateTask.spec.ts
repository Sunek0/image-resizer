import errors from 'common-errors';
import { ICreateTaskInput } from '../interfaces/ICreateTaskInput';
import { CreateTask } from './create-task'
import { DummyTaskRepository } from '../../../../test/mocks/repositories/DummyTaskRepository';
import { DummyFileService } from '../../../../test/mocks/services/DummyFileService';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Domain create task use case unit tests', () => {
  it('should execute if file exists', async () => {
    const dummyTaskRepository = new DummyTaskRepository();
    const repositorySpy = jest.spyOn(dummyTaskRepository, 'add');

    const dummyFileService = new DummyFileService();

    const serviceSpy = jest.spyOn(dummyFileService, 'fileExists')
      .mockResolvedValue(Promise.resolve(true));

    const task = new CreateTask(dummyTaskRepository, dummyFileService);
    const input: ICreateTaskInput = {
      fileName: 'foo',
      localDirectory: 'bar'
    };

    await task.execute(input);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw error if file not exists', async () => {
    const dummyTaskRepository = new DummyTaskRepository();
    const dummyFileService = new DummyFileService();

    const serviceSpy = jest.spyOn(dummyFileService, 'fileExists')
      .mockResolvedValue(Promise.resolve(false));

    const task = new CreateTask(dummyTaskRepository, dummyFileService);
    const input: ICreateTaskInput = {
      fileName: 'foo',
      localDirectory: 'bar'
    };

    try {
      await task.execute(input);
    }
    catch (err) {
      expect(serviceSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(errors.io.FileNotFoundError);
    }
  });
});
