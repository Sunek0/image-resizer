import { File } from './File'

describe('Domain file entity unit tests', () => {
  it('should constructor populate properties', () => {
    const filename = 'foobar';
    const data = [0, 1, 2];
    const file = new File(filename, data);

    expect(file.filename).toStrictEqual(filename);
    expect(file.data).toStrictEqual(data);
  });
});
