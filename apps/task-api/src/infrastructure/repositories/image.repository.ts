import { TableClient, defineTable } from '@hexlabs/dynamo-ts';
import { Image } from '../../core/domain/entities/image';
import { IImageRepository } from '../../core/repositories/image.repository';
import { DynamoDBRepository } from './ddb.repository';
import config from 'config';

export class ImagesRepositoryDDB extends DynamoDBRepository implements IImageRepository {
  imageClient: any;

  constructor() {
    super();

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

    await this.imageClient.put(params);

    return image;
  }

  async findById(imageId: string): Promise<any> {
    const params = {
      id: imageId
    };

    const result = await this.imageClient.get(params);

    return result.item;
  }
}
