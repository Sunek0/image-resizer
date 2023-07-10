import { Hash } from 'crypto';

export interface FileChecksumInteractor {
  computeChecksum(data: any): Hash;
}
