import { DynamoDB } from '@aws-sdk/client-dynamodb';
import config from 'config';

let databaseConnection: DynamoDB;

const connectDatabase = async (): Promise<DynamoDB> => {
  // return new DynamoDBClient({ region: databaseConfig.region });
  const dbConfig = config.get('aws.dynamodb');
  databaseConnection = new DynamoDB({
    region: dbConfig.region,
    credentials: {
      accessKeyId: dbConfig.accessKeyId,
      secretAccessKey: dbConfig.secretAccessKey
    }
  });

  return databaseConnection;
};

export { databaseConnection, connectDatabase };
