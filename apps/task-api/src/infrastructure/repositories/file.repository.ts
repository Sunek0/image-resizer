import { parse } from 'path';
import { Upload } from "@aws-sdk/lib-storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { File } from "../../core/domain/entities/file";
import { FileRepository } from "../../core/repositories/file.repository";
import { S3Repository } from "./s3.repository";

const bucket = process.env.S3_BUCKET_NAME;

export class FileRepositoryS3 extends S3Repository implements FileRepository {
  constructor() {
    super();
  }

  putItem(image: File): Promise<void> {
    const parsedFile = parse(image.filename);

    return new Upload({
      client: this.s3Client,
      params: {
          Bucket: bucket,
          Key: parsedFile.base,
          Body: image.data
      }
    })
      .done()
      .then(() =>{
        console.log('pum')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getItem(imagePath: string): Promise<File | null> {
    const imageParams = {
        Bucket: bucket,
        Key: imagePath
    };

    const getImageCommand = new GetObjectCommand(imageParams)
    return this.s3Client.send(getImageCommand)
      .then((data) => {
        return new File(imagePath, data)
      })
  }
}
