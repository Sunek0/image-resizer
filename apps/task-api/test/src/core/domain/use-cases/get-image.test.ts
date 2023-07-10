import { GetImage } from '../../../../../src/core/domain/use-cases/get-image'
import { DummyImageRepository } from '../../../../mocks/dummy-image-repository';

describe('Domain get image use case unit tests', () => {
  it('should execute', () => {
    const dummyImageRepository = new DummyImageRepository();
    const repositorySpy = jest.spyOn(dummyImageRepository, 'findById');
    const task = new GetImage(dummyImageRepository);

    task.execute('foobar');

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
