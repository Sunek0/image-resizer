import fs, { promises as fsp } from 'fs';
import errors from 'common-errors';
import { LocalFileService } from './local-file.service'

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Service local file unit tests', () => {
  it('should fileExists return true if file exists', async () => {
    const localFileService = new LocalFileService();
    const statSpy = jest.spyOn(fsp, 'stat')
      .mockResolvedValue(Promise.resolve(new fs.Stats()));

    const fileExists = await localFileService.fileExists('foobar');

    expect(statSpy).toHaveBeenCalledTimes(1);
    expect(fileExists).toBeTruthy();
  });

  it('should fileExists return false if file not exists', async () => {
    const localFileService = new LocalFileService();
    const statSpy = jest.spyOn(fsp, 'stat')
      .mockResolvedValue(Promise.reject());

    const fileExists = await localFileService.fileExists('foobar');

    expect(statSpy).toHaveBeenCalledTimes(1);
    expect(fileExists).toBeFalsy();
  });

  it('should getReaderStream return stream', async () => {
    const localFileService = new LocalFileService();
    const createReadStreamSpy = jest.spyOn(fs, 'createReadStream')
      .mockReturnThis();

    const getReaderStream = localFileService.getReaderStream('foobar');

    expect(createReadStreamSpy).toHaveBeenCalledTimes(1);
  });

  it('should getReaderStream thrown IO error if fails', async () => {
    const localFileService = new LocalFileService();
    const createReadStreamSpy = jest.spyOn(fs, 'createReadStream')
      .mockImplementation(() => {
        throw new Error('');
      });

    try {
      const getReaderStream = localFileService.getReaderStream('foobar');
    }
    catch (err: any) {
      expect(createReadStreamSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(errors.io.IOError);;
    }
  });

  it('should getWritableStream return stream', async () => {
    const localFileService = new LocalFileService();
    const createWriteStreamSpy = jest.spyOn(fs, 'createWriteStream')
      .mockReturnThis();

    const getWritableStream = localFileService.getWritableStream('foobar');

    expect(createWriteStreamSpy).toHaveBeenCalledTimes(1);
  });

  it('should getWritableStream thrown IO error if fails', async () => {
    const localFileService = new LocalFileService();
    const createWriteStreamSpy = jest.spyOn(fs, 'createWriteStream')
      .mockImplementation(() => {
        throw new Error('');
      });

    try {
      const getWritableStream = localFileService.getWritableStream('foobar');
    }
    catch (err: any) {
      expect(createWriteStreamSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(errors.io.IOError);;
    }
  });

  it('should createFolder return true if file exists', async () => {
    const localFileService = new LocalFileService();
    const mkdirSpy = jest.spyOn(fsp, 'mkdir')
      .mockResolvedValue(Promise.resolve(undefined));

    const createFolder = await localFileService.createFolder('foobar');

    expect(mkdirSpy).toHaveBeenCalledTimes(1);
    expect(createFolder).toBeUndefined();
  });

  it('should createFolder return false if file not exists', async () => {
    const localFileService = new LocalFileService();
    const mkdirSpy = jest.spyOn(fsp, 'mkdir')
      .mockResolvedValue(Promise.reject({ name: 'error '}));

    try {
      await localFileService.createFolder('foobar');

    }
    catch (err: any) {
      expect(mkdirSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(errors.io.IOError);
    }
  });
});
