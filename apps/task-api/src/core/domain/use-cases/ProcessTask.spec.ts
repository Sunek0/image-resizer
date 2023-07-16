import errors from 'common-errors';
import crypto from 'crypto';
import { Image } from '../entities/Image';
import { File } from '../entities/File';
import { ReadStream, WriteStream, fstat } from 'fs';
import { IProcessTaskInput } from '../interfaces/IProcessTaskInput';
import { ProcessTask } from './ProcessTask';
import { DummyFileRepository } from '../../../../test/mocks/repositories/DummyFileRepository';
import { DummyTaskRepository } from '../../../../test/mocks/repositories/DummyTaskRepository';
import { DummyImageRepository } from '../../../../test/mocks/repositories/DummyImageRepository';
import { DummyFileChecksumService } from '../../../../test/mocks/services/DummyFileChecksumService';
import { DummyFileService } from '../../../../test/mocks/services/DummyFileService';
import { DummyImageInfoService } from '../../../../test/mocks/services/DummyImageInfoService';
import { DummyLambdaService } from '../../../../test/mocks/services/DummyLambdaService';
import { Readable, Writable } from 'stream';
import { ImageInfo } from '../entities/ImageInfo';

beforeEach(() => {
  jest.clearAllMocks();
});

// TODO: finish unit tests

describe('Domain process task use case unit tests', () => {
  it('should execute if file exists', async () => {
    const dummyFileRepository = new DummyFileRepository();
    const filePutSpy = jest.spyOn(dummyFileRepository, 'putItem')
      .mockImplementation(() => Promise.resolve());
    const fileGetSpy = jest.spyOn(dummyFileRepository, 'getItem')
      .mockImplementation(() => Promise.resolve(new File('foobar', '1234')));

    const dummyImageRepository = new DummyImageRepository();
    const imageAddSpy = jest.spyOn(dummyImageRepository, 'add')
      .mockImplementation(() => Promise.resolve(new Image('dummyPath', '1234abcd', 1024, 768)));
    const imageFindSpy = jest.spyOn(dummyImageRepository, 'findById')
    .mockImplementation(() => Promise.resolve(new Image('dummyPath', '1234abcd', 1024, 768)));

    const dummyTaskRepository = new DummyTaskRepository();
    const updateTaskpy = jest.spyOn(dummyTaskRepository, 'update')
      .mockImplementation(() => Promise.resolve());

    const dummyFileChecksumService = new DummyFileChecksumService();
    const hashEnd = jest.fn();
    const hashRead = jest.fn().mockReturnValue('1234abcd');
    const fileChecksumSpy = jest.spyOn(dummyFileChecksumService, 'computeChecksum')
    .mockImplementation(() => {
      const hash = crypto.createHash('sha256');
      hash.end = hashEnd;
      hash.read = hashRead;
      return hash;
    });

    const dummyFileService = new DummyFileService();
    const fileReadableSpy = jest.spyOn(dummyFileService, 'getReaderStream')
      .mockImplementation(() => {
        return new Readable() as ReadStream;
      });
    const createFolderySpy = jest.spyOn(dummyFileService, 'createFolder');
    const fileWritableSpy = jest.spyOn(dummyFileService, 'getWritableStream')
      .mockImplementation(() => {
        return new Writable() as WriteStream;
      });

    const dummyImageInfoService = new DummyImageInfoService();
    const imageInfoSpy = jest.spyOn(dummyImageInfoService, 'getImageInfo')
      .mockImplementation(() => Promise.resolve(new ImageInfo('png', 1024, 768)));

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
    } catch (err) {
      console.log('errir', err);
    }

    expect(fileReadableSpy).toHaveBeenCalledTimes(1);
    expect(filePutSpy).toHaveBeenCalledTimes(1);
    expect(imageInfoSpy).toHaveBeenCalledTimes(1);
    expect(fileChecksumSpy).toHaveBeenCalledTimes(1);

    expect(hashRead).toHaveBeenCalledTimes(1);
    expect(imageAddSpy).toHaveBeenCalledTimes(1);
    expect(resizeImageSpy).toHaveBeenCalledTimes(1);
    expect(imageFindSpy).toHaveBeenCalledTimes(2);

    expect(fileGetSpy).toHaveBeenCalledTimes(2);
    expect(createFolderySpy).toHaveBeenCalledTimes(2);
    expect(fileWritableSpy).toHaveBeenCalledTimes(2);
    expect(updateTaskpy).toHaveBeenCalledTimes(1);
  });
});
