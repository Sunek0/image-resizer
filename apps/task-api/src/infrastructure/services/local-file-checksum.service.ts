import { Service } from 'typedi';
import crypto from 'crypto';
import { IFileChecksumService } from '../../core/services/file-checksum.service';
import { Stream } from 'stream';

@Service('FileChecksumService')
export class LocalFileChecksumService implements IFileChecksumService {
  computeChecksum(data: Stream): crypto.Hash {
    const hashFile = crypto.createHash('sha256');
    hashFile.setEncoding('hex');
    data.pipe(hashFile);

    return hashFile;
  }
}
