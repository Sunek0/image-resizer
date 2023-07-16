import { getMockReq, getMockRes } from '@jest-mock/express'
import { GetTaskController } from './GetTaskController'
import { GetTask } from '../../core/domain/use-cases/get-task';
import { DummyTaskRepository } from '../../../test/mocks/repositories/DummyTaskRepository';
import { Task } from '../../core/domain/entities/Task';
import { TaskStatus } from '../../core/domain/entities/TaskStatus';

describe('Domain file entity unit tests', () => {
  it('should return 200 when task found', async () => {
    jest.mock('../../core/domain/use-cases/get-task');

    const dummyTaskRepository = new DummyTaskRepository();
    const getTask = new GetTask(dummyTaskRepository);
    const task = new Task('foobar', TaskStatus.Processing);

    const getTaskSpy = jest.spyOn(getTask, 'execute')
      .mockResolvedValue(task)

    const getTaskController = new GetTaskController(getTask);

    const request = getMockReq({ params: { taskId: '1234abcd' }});
    const { res } = getMockRes();

    const statusSpy = jest.spyOn(res, 'status');

    await getTaskController.request(request, res);

    expect(getTaskSpy).toBeCalledTimes(1);
    expect(getTaskSpy.mock.calls[0][0]).toBe('1234abcd');
    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy.mock.calls[0][0]).toBe(200);
  });

  it('should return 400 when task not found', async () => {
    jest.mock('../../core/domain/use-cases/get-task');

    const dummyTaskRepository = new DummyTaskRepository();
    const getTask = new GetTask(dummyTaskRepository);

    const getTaskSpy = jest.spyOn(getTask, 'execute')
      .mockResolvedValue(null)

    const getTaskController = new GetTaskController(getTask);

    const request = getMockReq({ params: { taskId: '1234abcd' }});
    const { res } = getMockRes();
    const statusSpy = jest.spyOn(res, 'status');

    await getTaskController.request(request, res);

    expect(getTaskSpy).toBeCalledTimes(1);
    expect(getTaskSpy.mock.calls[0][0]).toBe('1234abcd');
    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy.mock.calls[0][0]).toBe(400);
  });

  it('should return 500 when a error is thrown', async () => {
    jest.mock('../../core/domain/use-cases/get-task');

    const dummyTaskRepository = new DummyTaskRepository();
    const getTask = new GetTask(dummyTaskRepository);

    const getTaskSpy = jest.spyOn(getTask, 'execute')
      .mockRejectedValue(new Error())

    const getTaskController = new GetTaskController(getTask);

    const request = getMockReq({ params: { taskId: '1234abcd' }});
    const { res } = getMockRes();

    const statusSpy = jest.spyOn(res, 'status');

    await getTaskController.request(request, res);

    expect(getTaskSpy).toBeCalledTimes(1);
    expect(getTaskSpy.mock.calls[0][0]).toBe('1234abcd');
    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy.mock.calls[0][0]).toBe(500);
  });
});
