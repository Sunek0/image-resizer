import { ImageResize } from './ImageResize';

describe('Domain image resize entity unit tests', () => {
  it('should constructor populate properties', () => {
    const status = 'foobar';
    const imageId = '1234';
    const imageBigId = '5678';
    const imageLittleId = '9012';
    const imageResize = new ImageResize(status, imageId, imageBigId, imageLittleId);

    expect(imageResize.status).toStrictEqual(status);
    expect(imageResize.imageId).toStrictEqual(imageId);
    expect(imageResize.imageBigId).toStrictEqual(imageBigId);
    expect(imageResize.imageLittleId).toStrictEqual(imageLittleId);
  });
});
