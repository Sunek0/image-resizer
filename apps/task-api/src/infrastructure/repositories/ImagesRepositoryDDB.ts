import { TableClient, defineTable } from '@hexlabs/dynamo-ts';
import config from 'config';
import errors from 'common-errors';
import { Service } from 'typedi';
import { logger } from '../../config/logger';
import { Image } from '../../core/domain/entities/Image';
import { IImageRepository } from '../../core/repositories/IImageRepository';
import { DynamoDBRepository } from './DynamoDBRepository';
import { DynamoDBDatabase } from '../database/DynamoDBDatabase';

@Service('ImageRepository')
export class ImagesRepositoryDDB extends DynamoDBRepository implements IImageRepository {
  private imageClient: any;

  constructor(protected dynamoDB: DynamoDBDatabase) {
    super(dynamoDB);

    const imageTableDefinition = defineTable(
      {
        id: 'string',
        parentId: 'string',
        path: 'string',
        checksum: 'string',
        width: 'number',
        height: 'number'
      },
      'id',
    );

    this.imageClient = TableClient.build(imageTableDefinition, {
      tableName: config.aws.dynamodb.tables.images,
      client: this.dbClient,
      logStatements: true
    });

  }

  async add(image: Image): Promise<Image> {
    const params = {
      id: image.id,
      parentId: image.parentId,
      path: image.path,
      checksum: image.checksum,
      width: image.width.toString(),
      height: image.height.toString()
    };

    try {
      await this.imageClient.put(params);
      return image;
    } catch (err: any) {
      logger.error({ error: err }, 'Error adding a image');
      throw new errors.data.DataError('Error adding a image', err);
    }
  }

  async findById(imageId: string): Promise<any> {
    const params = {
      id: imageId
    };

    try {
      const result = await this.imageClient.get(params);
      return result.item;
    } catch (err: any) {
      logger.error({ error: err }, 'Error fetching a image');
      throw new errors.data.DataError('Error fetching a image', err);
    }
  }
}
