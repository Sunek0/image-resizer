import { Hash } from 'crypto';
import { ImageInfo } from '../entities/image-info';
import { FileChecksumInteractor } from '../../interactors/file-checksum.interactor';

export class GetFileChecksum {
  private fileChecksumInteractor: FileChecksumInteractor;

  constructor(fileChecksumInteractor: FileChecksumInteractor) {
    this.fileChecksumInteractor = fileChecksumInteractor;
  }

  execute(stream: any): Hash {
    const hash = this.fileChecksumInteractor.computeChecksum(stream);
    return hash;
  }
}
