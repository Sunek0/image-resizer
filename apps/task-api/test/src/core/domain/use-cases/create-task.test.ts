import { TaskStatus } from '../../../../../src/core/domain/entities/task-status';
import { UpdateTaskInput } from '../../../../../src/core/domain/interfaces/update-task-input';
import { UpdateTask } from '../../../../../src/core/domain/use-cases/update-task'
import { DummyTaskRepository } from '../../../../mocks/dummy-task-repository';

describe('Domain create task use case unit tests', () => {
  it('should execute', () => {
    const dummyTaskRepository = new DummyTaskRepository();
    const repositorySpy = jest.spyOn(dummyTaskRepository, 'update');
    const task = new UpdateTask(dummyTaskRepository);
    const updateTaskInput: UpdateTaskInput = {
      id: 'foobar',
      status: TaskStatus.Processing
    }
    task.execute(updateTaskInput);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
