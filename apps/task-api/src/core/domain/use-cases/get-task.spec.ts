import { GetTask } from './get-task'
import { DummyTaskRepository } from '../../../../test/mocks/repositories/dummy-task-repository';

describe('Domain get task use case unit tests', () => {
  it('should execute', () => {
    const dummyTaskRepository = new DummyTaskRepository();
    const repositorySpy = jest.spyOn(dummyTaskRepository, 'findById');
    const task = new GetTask(dummyTaskRepository);

    task.execute('foobar');

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
