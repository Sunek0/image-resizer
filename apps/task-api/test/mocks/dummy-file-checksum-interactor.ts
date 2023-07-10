import crypto from 'crypto';
import { ImageResize } from "../../src/core/domain/entities/image-resize";
import { FileChecksumInteractor } from "../../src/core/interactors/file-checksum.interactor";

export class DummyFileChecksumInteractor implements FileChecksumInteractor {
  computeChecksum(data: any): crypto.Hash {
    return crypto.createHash('md5');
  }
}
