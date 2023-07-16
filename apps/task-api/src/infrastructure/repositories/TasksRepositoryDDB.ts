import config from 'config';
import { Service } from 'typedi';
import { TableClient, defineTable } from '@hexlabs/dynamo-ts';
import errors from 'common-errors';
import { logger } from '../../config/logger';
import { Task } from '../../core/domain/entities/Task';
import { ITaskRepository } from '../../core/repositories/ITaskRepository';
import { DynamoDBRepository } from './DynamoDBRepository';
import { TaskStatus } from '../../core/domain/entities/TaskStatus';
import { DynamoDBDatabase } from '../database/DynamoDBDatabase';

@Service('TaskRepository')
export class TasksRepositoryDDB extends DynamoDBRepository implements ITaskRepository {
  private taskClient: any;

  constructor(protected dynamoDB: DynamoDBDatabase) {
    super(dynamoDB);

    const taskTableDefinition = defineTable(
      {
        id: 'string',
        path: 'string',
        status: 'string',
        createdAt: 'number',
        updatedAt: 'number'
      },
      'id',
    );

    this.taskClient = TableClient.build(taskTableDefinition, {
      tableName: config.aws.dynamodb.tables.tasks,
      client: this.dbClient,
      logStatements: true
    });

  }

  async add(task: Task): Promise<Task> {
    const params = {
      id: task.id,
      path: task.path,
      status: task.status.toString() ,
      cretedAt: task.createdAt.toString(),
      updatedAt: task.updatedAt.toString()
    };

    try {
      await this.taskClient.put(params);
      return task;
    } catch (err: any) {
      logger.error({ error: err }, 'Error adding a task');
      throw new errors.data.DataError('Error adding a task', err);
    }
  }

  async findById(taskId: string): Promise<any> {
    const params = {
      id: taskId
    };

    try {
      const result = await this.taskClient.get(params);
      return result.item;
    } catch (err: any) {
      logger.error({ error: err }, 'Error fetching a task');
      throw new errors.data.DataError('Error fetching a task', err);
    }
  }

  async update(taskId: string, status: TaskStatus): Promise<void> {
    const params = {
      key: {
        id: taskId
      },
      updates: {
        status: status.toString(),
        updatedAt: new Date().getTime().toString()
      }
    };

    try {
      await this.taskClient.update(params);
    } catch (err: any) {
      logger.error({ error: err }, 'Error updating a task');
      throw new errors.data.DataError('Error updating a task', err);
    }
  }
}
