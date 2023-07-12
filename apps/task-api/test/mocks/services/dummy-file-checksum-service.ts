import crypto from 'crypto';
import { IFileChecksumService } from "../../../src/core/services/file-checksum.service";

export class DummyFileChecksumService implements IFileChecksumService {
  computeChecksum(data: any): crypto.Hash {
    return crypto.createHash('md5');
  }
}
