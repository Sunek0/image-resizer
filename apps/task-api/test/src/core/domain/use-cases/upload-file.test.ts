import { UploadFileInput } from '../../../../../src/core/domain/interfaces/upload-file-input';
import { UploadFile } from '../../../../../src/core/domain/use-cases/upload-file'
import { DummyFileRepository } from '../../../../mocks/dummy-file-repository';

describe('Domain upload file use case unit tests', () => {
  it('should execute', () => {
    const dummyFileRepository = new DummyFileRepository();
    const repositorySpy = jest.spyOn(dummyFileRepository, 'putItem');
    const task = new UploadFile(dummyFileRepository);
    const updateTaskInput: UploadFileInput = {
      data: [0, 1, 2],
      filename: 'foobar'
    }
    task.execute(updateTaskInput);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
