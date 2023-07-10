import { GetFileChecksum } from '../../../../../src/core/domain/use-cases/get-file-checksum'
import { DummyFileChecksumInteractor } from '../../../../mocks/dummy-file-checksum-interactor';

describe('Domain get file checksum use case unit tests', () => {
  it('should execute', () => {
    const dummyFileChecksumInteractor = new DummyFileChecksumInteractor();
    const repositorySpy = jest.spyOn(dummyFileChecksumInteractor, 'computeChecksum');
    const task = new GetFileChecksum(dummyFileChecksumInteractor);

    task.execute('foobar');

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
