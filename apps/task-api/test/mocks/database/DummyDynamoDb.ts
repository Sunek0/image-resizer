import { DynamoDBDatabase } from "../../../src/infrastructure/database/DynamoDBDatabase";

export class DummyDynamoDb extends DynamoDBDatabase {
  connect(): Promise<void> {
    return Promise.resolve();
  }
}
