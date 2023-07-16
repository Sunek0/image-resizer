import { ImageInfo } from './ImageInfo'

describe('Domain image entity unit tests', () => {
  it('should constructor populate properties', () => {
    const format = 'foobar';
    const width = 1024;
    const height = 768;
    const task = new ImageInfo(format, width, height);

    expect(task.format).toStrictEqual(format);
    expect(task.width).toStrictEqual(width);
    expect(task.height).toStrictEqual(height);
  });
});
