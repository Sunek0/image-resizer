import { Hash } from 'crypto';

export interface IFileChecksumService {
  computeChecksum(data: any): Hash;
}
