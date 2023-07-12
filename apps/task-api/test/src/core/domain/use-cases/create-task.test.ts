import errors from 'common-errors';
import { ICreateTaskInput } from '../../../../../src/core/domain/interfaces/create-task-input';
import { CreateTask } from '../../../../../src/core/domain/use-cases/create-task'
import { DummyTaskRepository } from '../../../../mocks/repositories/dummy-task-repository';
import { DummyFileService } from '../../../../mocks/services/dummy-file-service';

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
