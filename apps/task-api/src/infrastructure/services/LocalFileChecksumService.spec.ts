import { Stream } from 'stream';
import { LocalFileChecksumService } from './LocalFileChecksumService';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Service local file checksum unit tests', () => {
  it('should do a computer checksum', () => {
    jest.mock('image-size-stream', () => {
        return () => ({
            on: jest.fn()
        });
    });
    const dummyLocalImageInfoService = new LocalFileChecksumService();

    const dummyData: Stream = new Stream();
    dummyData.pipe = jest.fn();

    dummyLocalImageInfoService.computeChecksum(dummyData);

    expect(dummyData.pipe).toHaveBeenCalledTimes(1);
  });
});
