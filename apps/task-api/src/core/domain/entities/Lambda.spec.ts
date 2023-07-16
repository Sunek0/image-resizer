import { Lambda } from './Lambda'


describe('Domain lambda entity unit tests', () => {
  it('should constructor populate properties', () => {
    const status = 'foobar';
    const imageId = '1234';
    const imageBigId = '5678';
    const imageLittleId = '9012';
    const lambda = new Lambda(status, imageId, imageBigId, imageLittleId);

    expect(lambda.status).toStrictEqual(status);
    expect(lambda.imageId).toStrictEqual(imageId);
    expect(lambda.imageLittleId).toStrictEqual(imageLittleId);
    expect(lambda.imageLittleId).toStrictEqual(imageLittleId);
  });
});
