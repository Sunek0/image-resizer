import crypto from 'crypto';
import { IFileChecksumService } from "../../../src/core/services/IFileChecksumService";

export class DummyFileChecksumService implements IFileChecksumService {
  computeChecksum(data: any): crypto.Hash {
    return crypto.createHash('md5');
  }
}
