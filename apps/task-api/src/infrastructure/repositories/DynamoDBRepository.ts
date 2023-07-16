import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBDatabase } from '../database/DynamoDBDatabase';
import { Service } from 'typedi';

@Service()
export class DynamoDBRepository {
  protected dbClient: DynamoDBDocument;

  constructor(protected dynamoDB: DynamoDBDatabase) {
    this.dbClient = DynamoDBDocument.from(dynamoDB.instance);
  }
}
