import crypto from 'crypto';

export class HashingHandler {
  hashingStream: any;

  constructor(algorithm: string = 'sha256') {
    this.hashingStream = crypto.createHash(algorithm);
    this.hashingStream.setEncoding('hex');
  }
}
