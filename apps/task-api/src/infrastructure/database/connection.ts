import { DynamoDB } from "@aws-sdk/client-dynamodb";
import databaseConfig from '../../config/database';

let databaseConnection: DynamoDB

const connectDatabase = async (): Promise<DynamoDB> => {
  // return new DynamoDBClient({ region: databaseConfig.region });
  databaseConnection = new DynamoDB({
    region: databaseConfig.region,
    credentials: { accessKeyId: databaseConfig.accessKeyId, secretAccessKey: databaseConfig.secretAccessKey }
  });

  return databaseConnection;
};

export { databaseConnection, connectDatabase };
