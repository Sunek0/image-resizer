import { DynamoDB } from '@aws-sdk/client-dynamodb';
import config from 'config';
import { Service } from 'typedi';

@Service()
export class DynamoDBDatabase {
  public instance: DynamoDB;

  async connect(): Promise<void> {
    const dbConfig = config.get('aws.dynamodb');
    this.instance = new DynamoDB({
      region: dbConfig.region,
      credentials: {
        accessKeyId: dbConfig.accessKeyId,
        secretAccessKey: dbConfig.secretAccessKey
      }
    });

    await this.instance;
  }
}
