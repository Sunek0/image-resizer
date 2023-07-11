import { Inject, Service } from 'typedi';
import { Hash } from 'crypto';
import { IFileChecksumService } from '../../services/file-checksum.service';

@Service()
export class GetFileChecksum {
  constructor(@Inject('FileChecksumService') private fileChecksumService: IFileChecksumService) {}

  execute(stream: any): Hash {
    const hash = this.fileChecksumService.computeChecksum(stream);
    return hash;
  }
}
