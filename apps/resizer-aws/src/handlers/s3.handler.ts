import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, GetObjectCommand, GetObjectCommandInput, PutObjectCommandInput } from "@aws-sdk/client-s3";

export class S3Handler {
  s3Client: any;

  constructor(region: string = 'eu-west-1') {
    this.s3Client = new S3Client({
      region
    });
  }

  getItem(params: GetObjectCommandInput) {
    const getImageCommand = new GetObjectCommand(params)

    return this.s3Client.send(getImageCommand)
  }

  putItem(params: PutObjectCommandInput) {
    return new Upload({
      client: this.s3Client,
      params: params
    })
      .done()
  }
}
