import errors from 'common-errors';
import { ReadStream, WriteStream, fstat } from "fs";
import { IProcessTaskInput } from '../interfaces/process-task-input';
import { ProcessTask } from './process-task'
import { DummyFileRepository } from '../../../../test/mocks/repositories/dummy-file-repository';
import { DummyImageRepository } from '../../../../test/mocks/repositories/dummy-image-repository';
import { DummyTaskRepository } from '../../../../test/mocks/repositories/dummy-task-repository';
import { DummyFileChecksumService } from '../../../../test/mocks/services/dummy-file-checksum-service';
import { DummyFileService } from '../../../../test/mocks/services/dummy-file-service';
import { DummyImageInfoService } from '../../../../test/mocks/services/dummy-image-info-service';
import { DummyLambdaService } from '../../../../test/mocks/services/dummy-lambda-service';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Domain process task use case unit tests', () => {
  it('should execute if file exists', async () => {
    const dummyFileRepository = new DummyFileRepository();
    const filePutSpy = jest.spyOn(dummyFileRepository, 'putItem');
    const fileGetSpy = jest.spyOn(dummyFileRepository, 'getItem');
    const dummyImageRepository = new DummyImageRepository();
    const imageAddSpy = jest.spyOn(dummyImageRepository, 'add');
    const imageFindSpy = jest.spyOn(dummyImageRepository, 'findById');

    const dummyTaskRepository = new DummyTaskRepository();
    const repositorySpy = jest.spyOn(dummyTaskRepository, 'add');

    const dummyFileChecksumService = new DummyFileChecksumService();
    const fileChecksumSpy = jest.spyOn(dummyFileChecksumService, 'computeChecksum');
    const dummyFileService = new DummyFileService();
    const fileReadableSpy = jest.spyOn(dummyFileService, 'getReaderStream');
    const fileWritableSpy = jest.spyOn(dummyFileService, 'getWritableStream');
    const dummyImageInfoService = new DummyImageInfoService();
    const imageInfoSpy = jest.spyOn(dummyImageInfoService, 'getImageInfo');

    const dummyDummyLambdaService = new DummyLambdaService();
    const resizeImageSpy = jest.spyOn(dummyDummyLambdaService, 'resizeImage');

    const task = new ProcessTask(
      dummyFileChecksumService,
      dummyFileRepository,
      dummyFileService,
      dummyImageInfoService,
      dummyImageRepository,
      dummyDummyLambdaService,
      dummyTaskRepository
    );

    const input: IProcessTaskInput = {
      fileName: 'foo',
      imageDirectory: 'input',
      outputDirectory: 'output',
      taskId: '1234'
    };

    try {
      await task.execute(input);
    }
    catch (err) {
      console.log('errir', err)
    }

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    // expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});
