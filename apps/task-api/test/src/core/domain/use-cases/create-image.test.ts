import { TaskStatus } from '../../../../../src/core/domain/entities/task-status';
import { CreateImageInput } from '../../../../../src/core/domain/interfaces/create-image-input';
import { CreateImage } from '../../../../../src/core/domain/use-cases/create-image'
import { DummyImageRepository } from '../../../../mocks/dummy-image-repository';

describe('Domain create image use case unit tests', () => {
  it('should execute', () => {
    const dummyImageRepository = new DummyImageRepository();
    const repositorySpy = jest.spyOn(dummyImageRepository, 'add');
    const task = new CreateImage(dummyImageRepository);
    const updateImageInput: CreateImageInput = {
      checksum: '1234',
      width: 1024,
      height: 768,
      path: 'foobar',
      parentId: ''
    }
    task.execute(updateImageInput);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
