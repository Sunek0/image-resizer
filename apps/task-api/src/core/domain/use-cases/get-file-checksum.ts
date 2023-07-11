import { Hash } from 'crypto';
import { ImageInfo } from '../entities/image-info';
import { IFileChecksumService } from '../../services/file-checksum.service';

export class GetFileChecksum {
  private fileChecksumService: IFileChecksumService;

  constructor(fileChecksumService: IFileChecksumService) {
    this.fileChecksumService = fileChecksumService;
  }

  execute(stream: any): Hash {
    const hash = this.fileChecksumService.computeChecksum(stream);
    return hash;
  }
}
