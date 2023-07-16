import { parse } from 'path';
import { Upload } from '@aws-sdk/lib-storage';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Service } from 'typedi';
import errors from 'common-errors';
import { logger } from '../../config/logger';
import { File } from '../../core/domain/entities/File';
import { IFileRepository } from '../../core/repositories/IFileRepository';
import { S3Repository } from './S3Repository';

@Service('FileRepository')
export class FileRepositoryS3 extends S3Repository implements IFileRepository {
  putItem(image: File): Promise<void> {
    const parsedFile = parse(image.filename);

    return new Upload({
      client: this.s3Client,
      params: {
          Bucket: this.config.bucket,
          Key: parsedFile.base,
          Body: image.data
      }
    })
      .done()
      .then(() => {
        logger.debug({ path: image.filename, bucket: this.config.bucket }, 'File uploaded');
      })
      .catch((err) => {
        logger.error({ error: err }, 'Error uploading a file');
        throw new errors.data.DataError('Error uploading a file', err);
      });
  }

  getItem(imagePath: string): Promise<File | null> {
    const imageParams = {
        Bucket: this.config.bucket,
        Key: imagePath
    };

    const getImageCommand = new GetObjectCommand(imageParams);
    return this.s3Client.send(getImageCommand)
      .then((data) => {
        logger.debug({ path: imagePath, bucket: this.config.bucket }, 'File fetched');
        return new File(imagePath, data);
      })
      .catch((err) => {
        logger.error({ error: err }, 'Error fetching a file');
        throw new errors.data.DataError('Error fetching a file', err);
      });
  }
}
