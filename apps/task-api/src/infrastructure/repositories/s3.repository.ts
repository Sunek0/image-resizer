import { S3Client } from '@aws-sdk/client-s3';
import config from 'config';
import { Service } from 'typedi';

@Service()
export class S3Repository {
  protected s3Client: S3Client;
  protected config: any;

  constructor() {
    this.config = config.get('aws.s3');

    this.s3Client = new S3Client({
      credentials: {
          accessKeyId: this.config.accessKeyId,
          secretAccessKey: this.config.secretAccessKey
      },
      region: this.config.region
  });
  }
}
