import crypto from 'crypto';
import { ImageInfo } from '../../core/domain/entities/image-info';
import { FileChecksumInteractor } from '../../core/interactors/file-checksum.interactor';

export class LocalChecksumInteractor implements FileChecksumInteractor {
  computeChecksum(data: any): crypto.Hash {
    const hashFile = crypto.createHash('sha256');
    hashFile.setEncoding('hex');
    data.pipe(hashFile);

    return hashFile;
  }
}
