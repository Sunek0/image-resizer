import { File } from "../../../src/core/domain/entities/file";
import { DynamoDBDatabase } from "../../../src/infrastructure/database/dynamodb";

export class DummyDynamoDb extends DynamoDBDatabase {
  connect(): Promise<void> {
    return Promise.resolve();
  }
}
