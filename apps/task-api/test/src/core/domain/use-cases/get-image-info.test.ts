import { GetImageInfo } from '../../../../../src/core/domain/use-cases/get-image-info'
import { DummyImageInfoInteractor } from '../../../../mocks/dummy-image-info-interactor';

describe('Domain get image info use case unit tests', () => {
  it('should execute', () => {
    const dummyImageInfoInteractor = new DummyImageInfoInteractor();
    const repositorySpy = jest.spyOn(dummyImageInfoInteractor, 'getImageInfo');
    const task = new GetImageInfo(dummyImageInfoInteractor);

    task.execute('foobar');

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
