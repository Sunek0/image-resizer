import { GetFile } from '../../../../../src/core/domain/use-cases/get-file'
import { DummyFileRepository } from '../../../../mocks/dummy-file-repository';

describe('Domain get file use case unit tests', () => {
  it('should execute', () => {
    const dummyFileRepository = new DummyFileRepository();
    const repositorySpy = jest.spyOn(dummyFileRepository, 'getItem');
    const task = new GetFile(dummyFileRepository);

    task.execute('foobar');

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
