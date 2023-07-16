import path from 'path';
import { getMockReq, getMockRes } from '@jest-mock/express';
import errors from 'common-errors';
import { PostTaskController } from './PostTaskController';
import { CreateTask } from '../../core/domain/use-cases/create-task';
import { ProcessTask } from '../../core/domain/use-cases/process-task';
import { DummyTaskRepository } from '../../../test/mocks/repositories/DummyTaskRepository';
import { Task } from '../../core/domain/entities/Task';
import { TaskStatus } from '../../core/domain/entities/TaskStatus';
import { DummyFileService } from '../../../test/mocks/services/DummyFileService';
import { DummyFileRepository } from '../../../test/mocks/repositories/DummyFileRepository';
import { DummyImageRepository } from '../../../test/mocks/repositories/DummyImageRepository';
import { DummyFileChecksumService } from '../../../test/mocks/services/DummyFileChecksumService';
import { DummyImageInfoService } from '../../../test/mocks/services/DummyImageInfoService';
import { DummyLambdaService } from '../../../test/mocks/services/DummyLambdaService';


describe('Domain file entity unit tests', () => {
  it('should return 202 when image found', async () => {
    jest.mock('../../core/domain/use-cases/get-task');

    jest.spyOn(path, 'join').mockImplementation(() => {
      return 'dummyPath'
    });

    const dummyFileRepository = new DummyFileRepository();
    const dummyImageRepository = new DummyImageRepository();
    const dummyTaskRepository = new DummyTaskRepository();
    const dummyFileChecksumService = new DummyFileChecksumService();
    const dummyFileService = new DummyFileService();
    const dummyImageInfoService = new DummyImageInfoService();
    const dummyLambdaService = new DummyLambdaService();

    const createTask = new CreateTask(dummyTaskRepository, dummyFileService);
    const processTask = new ProcessTask(
      dummyFileChecksumService,
      dummyFileRepository,
      dummyFileService,
      dummyImageInfoService,
      dummyImageRepository,
      dummyLambdaService,
      dummyTaskRepository
    );
    const task = new Task('foobar', TaskStatus.Processing);

    const createTaskSpy = jest.spyOn(createTask, 'execute')
      .mockImplementation(() => Promise.resolve(task))

    const processTaskSpy = jest.spyOn(processTask, 'execute')
      .mockImplementation(() => Promise.resolve())

    const postTaskController = new PostTaskController(createTask, processTask);

    const request = getMockReq({ body: { imageFile: 'foobar.jpg' }});
    const { res } = getMockRes();

    const statusSpy = jest.spyOn(res, 'status');

    await postTaskController.request(request, res);

    expect(createTaskSpy).toBeCalledTimes(1);
    expect(processTaskSpy).toBeCalledTimes(1);
    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy.mock.calls[0][0]).toBe(202);
  });

  it('should return 400 when image not found', async () => {
    jest.mock('../../core/domain/use-cases/get-task');

    jest.spyOn(path, 'join').mockImplementation(() => {
      return 'dummyPath'
    });

    const dummyFileRepository = new DummyFileRepository();
    const dummyImageRepository = new DummyImageRepository();
    const dummyTaskRepository = new DummyTaskRepository();
    const dummyFileChecksumService = new DummyFileChecksumService();
    const dummyFileService = new DummyFileService();
    const dummyImageInfoService = new DummyImageInfoService();
    const dummyLambdaService = new DummyLambdaService();

    const createTask = new CreateTask(dummyTaskRepository, dummyFileService);
    const processTask = new ProcessTask(
      dummyFileChecksumService,
      dummyFileRepository,
      dummyFileService,
      dummyImageInfoService,
      dummyImageRepository,
      dummyLambdaService,
      dummyTaskRepository
    );

    const createTaskSpy = jest.spyOn(createTask, 'execute')
      .mockImplementation(() => {
        throw new errors.io.FileNotFoundError();
      });

    const processTaskSpy = jest.spyOn(processTask, 'execute')
      .mockImplementation(() => Promise.resolve())

    const postTaskController = new PostTaskController(createTask, processTask);

    const request = getMockReq({ body: { imageFile: 'foobar.jpg' }});
    const { res } = getMockRes();

    const statusSpy = jest.spyOn(res, 'status');

    await postTaskController.request(request, res);

    expect(createTaskSpy).toBeCalledTimes(1);
    expect(processTaskSpy).toBeCalledTimes(0);
    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy.mock.calls[0][0]).toBe(400);
  });


  it('should return 400 when an error is thrown', async () => {
    jest.mock('../../core/domain/use-cases/get-task');

    jest.spyOn(path, 'join').mockImplementation(() => {
      return 'dummyPath'
    });

    const dummyFileRepository = new DummyFileRepository();
    const dummyImageRepository = new DummyImageRepository();
    const dummyTaskRepository = new DummyTaskRepository();
    const dummyFileChecksumService = new DummyFileChecksumService();
    const dummyFileService = new DummyFileService();
    const dummyImageInfoService = new DummyImageInfoService();
    const dummyLambdaService = new DummyLambdaService();

    const createTask = new CreateTask(dummyTaskRepository, dummyFileService);
    const processTask = new ProcessTask(
      dummyFileChecksumService,
      dummyFileRepository,
      dummyFileService,
      dummyImageInfoService,
      dummyImageRepository,
      dummyLambdaService,
      dummyTaskRepository
    );

    const createTaskSpy = jest.spyOn(createTask, 'execute')
      .mockImplementation(() => {
        throw new Error();
      });

    const processTaskSpy = jest.spyOn(processTask, 'execute')
      .mockImplementation(() => Promise.resolve())

    const postTaskController = new PostTaskController(createTask, processTask);

    const request = getMockReq({ body: { imageFile: 'foobar.jpg' }});
    const { res } = getMockRes();

    const statusSpy = jest.spyOn(res, 'status');

    await postTaskController.request(request, res);

    expect(createTaskSpy).toBeCalledTimes(1);
    expect(processTaskSpy).toBeCalledTimes(0);
    expect(statusSpy).toBeCalledTimes(1);
    expect(statusSpy.mock.calls[0][0]).toBe(400);
  });
});
