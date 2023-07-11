import crypto from 'crypto';
import { IFileChecksumService } from '../../core/services/file-checksum.service';

export class LocalChecksumService implements IFileChecksumService {
  computeChecksum(data: any): crypto.Hash {
    const hashFile = crypto.createHash('sha256');
    hashFile.setEncoding('hex');
    data.pipe(hashFile);

    return hashFile;
  }
}
