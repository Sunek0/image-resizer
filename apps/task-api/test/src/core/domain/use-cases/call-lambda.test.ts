import { CallLambda } from '../../../../../src/core/domain/use-cases/call-lambda'
import { DummyLambdaInteractor } from '../../../../mocks/dummy-lambda-interactor';

describe('Domain call lambda use case unit tests', () => {
  it('should execute', () => {
    const dummyLambdaInteractor = new DummyLambdaInteractor();
    const repositorySpy = jest.spyOn(dummyLambdaInteractor, 'resizeImage');
    const task = new CallLambda(dummyLambdaInteractor);

    task.execute('foobar');

    expect(repositorySpy).toHaveBeenCalledTimes(1);
  });
});
