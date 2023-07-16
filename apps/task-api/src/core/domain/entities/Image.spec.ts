import * as uuid from 'uuid';
import { Image } from './Image'

jest.mock('uuid');
const uuidSpy = jest.spyOn(uuid, 'v4');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Domain image entity unit tests', () => {
  it('should constructor populate properties with parentId', () => {
    const path = 'foobar';
    const checksum = '1234ABCD';
    const width = 1000;
    const height = 600;
    const parentId = '1234-5678'
    const image = new Image(path, checksum, width, height, parentId);

    expect(uuidSpy).toHaveBeenCalledTimes(1);
    expect(image.parentId).toStrictEqual(parentId);
    expect(image.path).toStrictEqual(path);
    expect(image.width).toStrictEqual(width);
    expect(image.height).toStrictEqual(height);
    expect(image.checksum).toStrictEqual(checksum);
  });

  it('should constructor populate properties without parentId', () => {
    const path = 'foobar';
    const checksum = '1234ABCD';
    const width = 1000;
    const height = 600;
    const image = new Image(path, checksum, width, height);

    expect(uuidSpy).toHaveBeenCalledTimes(1);
    expect(image.parentId).toStrictEqual('');
    expect(image.path).toStrictEqual(path);
    expect(image.width).toStrictEqual(width);
    expect(image.height).toStrictEqual(height);
    expect(image.checksum).toStrictEqual(checksum);
  });
});
