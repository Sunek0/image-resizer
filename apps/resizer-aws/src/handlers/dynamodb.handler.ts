import { DynamoDBClient, PutItemCommand, GetItemCommand, GetItemCommandInput, PutItemCommandInput } from "@aws-sdk/client-dynamodb";

export class DynamoDbHandler {
  ddbClient: any;

  constructor(region: string = 'eu-west-1') {
    this.ddbClient = new DynamoDBClient({ region });
  }
  getItem(params: GetItemCommandInput) {
    const getItemCommand = new GetItemCommand(params);
    return this.ddbClient.send(getItemCommand);
  }

  putItem(params: PutItemCommandInput) {
    const putItemCommand = new PutItemCommand(params);
    return this.ddbClient.send(putItemCommand);
  }
}
