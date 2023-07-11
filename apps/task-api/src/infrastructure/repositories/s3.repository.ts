import { S3Client } from '@aws-sdk/client-s3';
import config from 'config';

export class S3Repository {
  s3Client: S3Client;
  constructor() {
    const s3Config = config.get('aws.s3');

    this.s3Client = new S3Client({
      credentials: {
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secretAccessKey
      },
      region: s3Config.region
  });
  }
}
