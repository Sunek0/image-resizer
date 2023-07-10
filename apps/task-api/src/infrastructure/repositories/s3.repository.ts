import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import awsConfig from '../../config/aws';

export class S3Repository {
  s3Client: S3Client
  constructor() {
    this.s3Client = new S3Client({
      credentials: {
          accessKeyId: awsConfig.accessKeyId,
          secretAccessKey: awsConfig.secretAccessKey
      },
      region: awsConfig.region
  })
  }
}
