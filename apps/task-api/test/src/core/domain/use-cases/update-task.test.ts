import { TaskStatus } from '../../../../../src/core/domain/entities/task-status';
import { CreateTaskInput } from '../../../../../src/core/domain/interfaces/create-task-input';
import { CreateTask } from '../../../../../src/core/domain/use-cases/create-task'
import { DummyTaskRepository } from '../../../../mocks/dummy-task-repository';

describe('Domain update task use case unit tests', () => {
  it('should execute', () => {
    const dummyTaskRepository = new DummyTaskRepository();
    const repositorySpy = jest.spyOn(dummyTaskRepository, 'add');
    const task = new CreateTask(dummyTaskRepository);
    const createTaskInput: CreateTaskInput = {
      path: 'foo',
      status: TaskStatus.Processing
    }
    task.execute(createTaskInput);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
