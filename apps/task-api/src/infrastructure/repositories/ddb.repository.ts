import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { databaseConnection } from '../database/connection';

export class DynamoDBRepository {
  dbClient: DynamoDBDocument;
  constructor() {
    this.dbClient = DynamoDBDocument.from(databaseConnection);
  }
}
